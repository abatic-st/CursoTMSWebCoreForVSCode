// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => ({
    database: {
        type: process.env.ORM_TYPE,
        host: process.env.ORM_HOST,
        port: process.env.ORM_PORT,
        username: process.env.ORM_USERNAME,
        password: process.env.ORM_PASSWORD,
        database: process.env.ORM_DATABASE,
        syncronize: process.env.ORM_SYNCHRONIZE,
        logging: process.env.ORM_LOGGING,
        schema: process.env.ORM_SCHEMA,
    },
    jwtSecret: process.env.JWT_SECRET,
    jwtExpireIn: process.env.JWT_EXPIRE,
    jwtStrategy: process.env.JWT_STRATEGY,
    graphql: {
        playground: process.env.GRAPHQL_PLAYGROUND,
        debug: process.env.GRAPHQL_DEBUG,
    }
});