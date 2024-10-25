import winston from "winston";
const { combine, timestamp, label, printf } = winston.format;
import { Logger } from "@domain/logger/logger.interface";

class WinstonLogger implements Logger {
  private readonly logger: winston.Logger;
  private readonly format = printf(({ level, message, timestamp }: any) => {
    const msg: string =
      typeof message === "string" ? message : JSON.stringify(message);
    return `${timestamp} [${level.toUpperCase()}] ${msg}`;
  });

  constructor() {
    this.logger = winston.createLogger({
      format: combine(timestamp(), this.format),
      transports: [new winston.transports.Console()],
    });
  }

  info(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  warn(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }

  error(message: string, meta?: any) {
    this.logger.error(message, meta);
  }

  debug?(message: string, meta?: any) {
    this.logger.debug(message, meta);
  }
}

export default new WinstonLogger();
