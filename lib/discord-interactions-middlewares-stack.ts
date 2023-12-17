import path = require('path');

import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import type { Construct } from 'constructs';

export interface DiscordInteractionsMiddlewaresStackProps
    extends cdk.StackProps {
    ssmPrefix: string;
}

export class DiscordInteractionsMiddlewaresStack extends cdk.Stack {
    constructor(
        scope: Construct,
        id: string,
        props: DiscordInteractionsMiddlewaresStackProps,
    ) {
        super(scope, id, props);

        const lambdaPolicy = new iam.Policy(this, 'lambdaPolicy', {
            statements: [
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: [
                        'kms:Decrypt',
                        'ssm:GetParametersByPath',
                        'ssm:GetParameters',
                        'ssm:GetParameter',
                    ],
                    resources: [
                        'arn:aws:kms:*:*:key/CMK',
                        `arn:aws:ssm:*:*:parameter/${props.ssmPrefix}/*`,
                    ],
                }),
            ],
        });

        const discordInteractionsHandler = new NodejsFunction(
            this,
            'discordInteractionsHandler',
            {
                entry: path.join(
                    __dirname,
                    '../handlers/discord-bot-handler/index.ts',
                ),
                handler: 'handler',
                depsLockFilePath: path.join(
                    __dirname,
                    '../handlers/package-lock.json',
                ),
                runtime: lambda.Runtime.NODEJS_20_X,
                bundling: {
                    minify: true,
                    sourceMap: true,
                    // https://middy.js.org/docs/best-practices/bundling#bundlers
                    externalModules: [],
                },
                environment: {
                    SSM_PREFIX: props.ssmPrefix,
                },
            },
        );
        discordInteractionsHandler.role?.attachInlinePolicy(lambdaPolicy);
        discordInteractionsHandler.addFunctionUrl({
            authType: FunctionUrlAuthType.NONE,
        });
    }
}
