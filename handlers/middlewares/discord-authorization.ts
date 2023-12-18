import type middy from '@middy/core';
import { createError } from '@middy/util';
import type { APIGatewayProxyResult } from 'aws-lambda';
import { verifyKey } from 'discord-interactions';

import type { DiscordInteractionEvent } from '@/handlers/interaction-event-schema';
import { getEnv, getParameter } from '@/handlers/utils';

const discordAuthorizationMiddleware = (): middy.MiddlewareObj<
    DiscordInteractionEvent,
    APIGatewayProxyResult
> => {
    /**
     * Discord Authorization
     *
     * @see https://discord.com/developers/docs/interactions/receiving-and-responding#security-and-authorization
     */
    const discordAuthorizationMiddlewareBefore: middy.MiddlewareFn<
        DiscordInteractionEvent,
        APIGatewayProxyResult
    > = async (request): Promise<APIGatewayProxyResult | void> => {
        const headers = request.event.headers;
        const signature = headers['x-signature-ed25519'];
        const timestamp = headers['x-signature-timestamp'];
        const publicKey = await getParameter(
            `/${getEnv('SSM_PREFIX')}/discordPublicKey`,
        );

        if (
            !signature ||
            !timestamp ||
            !publicKey ||
            !verifyKey(request.event.rawBody, signature, timestamp, publicKey)
        ) {
            throw createError(401, 'discord authorization failed.');
        }
    };

    return {
        before: discordAuthorizationMiddlewareBefore,
    };
};

export default discordAuthorizationMiddleware;
