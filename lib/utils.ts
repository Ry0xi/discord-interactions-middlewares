export const getRequiredEnv = (key: string): string => {
    const env = process.env[key];
    if (env === undefined) {
        throw new Error(`'${key}' environment variable not defined`);
    }
    return env;
};
