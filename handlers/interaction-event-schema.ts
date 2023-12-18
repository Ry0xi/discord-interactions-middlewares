import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import type { InteractionType } from 'discord-interactions';

export interface DiscordInteractionEvent
    extends Omit<APIGatewayProxyEventV2, 'body'> {
    body: InteractionBodyType;
    rawBody: string;
}

export interface InteractionBodyType {
    id: string;
    application_id: string;
    type: InteractionType;
    token: string;
    // type: 1の時以外は存在する
    // https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-data
    data?: ApplicationCommandInteractionData;
}

export interface ApplicationCommandInteractionData {
    id: string;
    type: ApplicationCommandType;
    name: string;
    // Discordのパラメータ上ではオプショナルだが、コマンドの情報のために必須
    options: Array<ApplicationCommandInteractionDataOption>;
}

export interface ApplicationCommandInteractionDataOption {
    name: string;
    value: string | number | boolean;
    options?: Array<ApplicationCommandInteractionDataOption>;
}

// https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
export enum ApplicationCommandType {
    CHAT_INPUT = 1,
    USER = 2,
    MESSAGE = 3,
}
