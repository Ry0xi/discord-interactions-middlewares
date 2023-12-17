#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';

import { DiscordInteractionsMiddlewaresStack } from '@/lib/discord-interactions-middlewares-stack';
import { getRequiredEnv } from '@/lib/utils';

dotenv.config();

const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();
new DiscordInteractionsMiddlewaresStack(
    app,
    'DiscordInteractionsMiddlewaresStack',
    {
        env,
        ssmPrefix: getRequiredEnv('SSM_PREFIX'),
    },
);
