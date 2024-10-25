import "module-alias/register";
import { AppServer } from "./server";
import MongoDBSingleton from "@infrastructure/database/";

(async () => {
  await MongoDBSingleton.getInstance();
  new AppServer().createServer();
})();
