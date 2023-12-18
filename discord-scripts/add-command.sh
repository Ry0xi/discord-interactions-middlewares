#!/bin/bash

curl -X POST \
    "https://discord.com/api/v10/applications/$DISCORD_APP_ID/commands" \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bot $DISCORD_BOT_TOKEN" \
    -d "@./discord-scripts/add-command.json"
