# AWS Lambda Handler and Middlewares that handling Discord API Interactions

## Handlers

### discord-bot-handler

- handle discord bot application commands
- with two middlewares to handle interactions
  - discord-handle-ping-message: ACK a `PING` message
  - discord-authorization: verify request

### application-command-handler

- do something for your application

## CDK Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
