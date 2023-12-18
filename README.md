# AWS Lambda Handler and Middlewares that handling Discord API Interactions

## Handlers

### discord-bot-handler

- handle discord bot application commands
- with two middlewares to handle interactions
  - discord-handle-ping-message: ACK a `PING` message
  - discord-authorization: verify request
