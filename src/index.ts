import 'module-alias/register';
import { AppServer } from './server';
import MongoDBSingleton from '@src/infrastructure/database/';
import logger from '@src/infrastructure/helpers/logger';

(async () => {
    try {
        await MongoDBSingleton.getInstance();
    } catch (error) {
        logger.error(
            'Fatal error trying to connect to the database instance.',
            error
        );
    }
    try {
        new AppServer().run();
    } catch (error) {
        logger.error('Fatal error trying to create the app server.', error);
    }
})();
