import middy from '@middy/core';
import type {
    APIGatewayProxyEventV2,
    APIGatewayProxyResultV2,
} from 'aws-lambda';

import { getEnv } from '@/handlers/utils';

const handleInteraction = async (
    event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
    console.log('Start handling interaction.');
    console.log('SSM_PREFIX:', getEnv('SSM_PREFIX'));
    console.log('event:', event);

    return {
        statusCode: 200,
        body: 'ok',
    };
};

export const handler = middy().handler(handleInteraction);
