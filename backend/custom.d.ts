export { }
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URL: string;
            JWT_SECRET: string;
            JWT_TIMES: string
        }
    }
}