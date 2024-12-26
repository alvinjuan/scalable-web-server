import { config } from 'dotenv';
config();

export default {
    app: {
        port: process.env.PORT || 3000,
        nodeEnv: process.env.NODE_ENV || 'development',
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
    }
};