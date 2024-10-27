import 'module-alias/register';
import { AppServer } from './server';
import MongoDBSingleton from '@src/infrastructure/database/';

(async () => {
    await MongoDBSingleton.getInstance();
    new AppServer().run();
})();
