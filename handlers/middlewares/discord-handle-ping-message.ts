import type middy from '@middy/core';
import type { APIGatewayProxyResultV2 } from 'aws-lambda';
import { InteractionType } from 'discord-interactions';

import type { DiscordInteractionEvent } from '@/handlers/interaction-event-schema';

const discordHandlePingMessageMiddleware = (): middy.MiddlewareObj<
    DiscordInteractionEvent,
    APIGatewayProxyResultV2
> => {
    /**
     * PING - PONG
     *
     * @see https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction
     */
    const discordHandlePingMessageMiddlewareBefore: middy.MiddlewareFn<
        DiscordInteractionEvent,
        APIGatewayProxyResultV2
    > = async (request): Promise<APIGatewayProxyResultV2 | void> => {
        const interactionType = request.event.body.type;

        if (interactionType === InteractionType.PING) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    type: InteractionType.PING,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
        }
    };

    return {
        before: discordHandlePingMessageMiddlewareBefore,
    };
};

export default discordHandlePingMessageMiddleware;
