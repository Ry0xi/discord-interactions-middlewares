export const getEnv = (key: string): string => {
    const env = process.env[key];
    if (env === undefined) {
        throw new Error(`Environment variable ${key} is not defined.`);
    }
    return env;
};
