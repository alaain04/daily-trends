import mongoose, { Mongoose } from "mongoose";
import config from "../helpers/config";
import LOGGER from "../helpers/logger";

class MongoDBSingleton {
  public connection: Mongoose | undefined;

  async getInstance() {
    if (!this.connection) this.connection = await this.connectDatabase();
    return this.connection;
  }

  async connectDatabase() {
    const conn = await mongoose.connect(config.DATABASE_URI!);
    LOGGER.info("Connected to MongoDB");
    return conn;
  }
}

export default new MongoDBSingleton();
