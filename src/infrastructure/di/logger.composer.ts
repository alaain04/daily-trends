import LOGGER from "../helpers/logger";
import { Logger } from "@domain/logger/logger.interface";

class LoggerComposer {
  static readonly logger: Logger = LOGGER;
}

export default LoggerComposer;
