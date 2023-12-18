import middy from '@middy/core';
import httpErrorHandlerMiddleware from '@middy/http-error-handler';
import httpHeaderNormalizerMiddleware from '@middy/http-header-normalizer';
import httpJsonBodyParserMiddleware from '@middy/http-json-body-parser';
import inputOutputLoggerMiddleware from '@middy/input-output-logger';
import type {
    APIGatewayProxyEventV2,
    APIGatewayProxyResultV2,
} from 'aws-lambda';

import type { DiscordInteractionEvent } from '@/handlers/interaction-event-schema';
import discordAuthorizationMiddleware from '@/handlers/middlewares/discord-authorization';
import discordHandlePingMessageMiddleware from '@/handlers/middlewares/discord-handle-ping-message';
import { getEnv } from '@/handlers/utils';

const handleInteraction = async (
    event: DiscordInteractionEvent,
): Promise<APIGatewayProxyResultV2> => {
    console.log('Start handling interaction.');
    console.log('SSM_PREFIX:', getEnv('SSM_PREFIX'));
    console.log('event:', event);

    return {
        statusCode: 200,
        body: 'ok',
    };
};

export const handler = middy<APIGatewayProxyEventV2>()
    // input and output logging
    // https://middy.js.org/docs/middlewares/input-output-logger/
    .use(inputOutputLoggerMiddleware())
    // normalize HTTP headers to lowercase
    // https://middy.js.org/docs/middlewares/http-header-normalizer
    .use(httpHeaderNormalizerMiddleware())
    // add raw body for discord-authorization
    .before((request) => {
        (
            request.event as APIGatewayProxyEventV2 & { rawBody?: string }
        ).rawBody = request.event.body;
    })
    // parse HTTP request body and convert it into an object
    // https://middy.js.org/docs/middlewares/http-json-body-parser
    .use(httpJsonBodyParserMiddleware())
    .use(discordAuthorizationMiddleware())
    .use(discordHandlePingMessageMiddleware())
    // handle uncaught errors that contain the properties statusCode and message and creates a proper HTTP response for them
    // https://middy.js.org/docs/middlewares/http-error-handler
    .use(httpErrorHandlerMiddleware())
    .handler(handleInteraction);
