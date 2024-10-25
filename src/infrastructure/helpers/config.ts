import dotenv from 'dotenv';

dotenv.config();

export default {
    SERVER_PORT: process.env.SERVER_PORT ?? 3000,
    SERVER_VERSION: process.env.SERVER_VERSION,
    DATABASE_URI: process.env.DATABASE_URI,
};
