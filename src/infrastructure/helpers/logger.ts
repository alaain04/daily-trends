import winston from 'winston';
const { combine, timestamp, printf } = winston.format;
import { Logger } from '@domain/logger/logger.interface';

class WinstonLogger implements Logger {
    private readonly logger: winston.Logger;
    private readonly format = printf(({ level, message, timestamp }: any) => {
        const msg: string =
            typeof message === 'string' ? message : JSON.stringify(message);
        return `${timestamp} [${level.toUpperCase()}] ${msg}`;
    });

    constructor() {
        this.logger = winston.createLogger({
            format: combine(timestamp(), this.format),
            transports: [new winston.transports.Console()],
        });
    }

    info(message: string) {
        this.logger.info(message);
    }

    warn(message: string) {
        this.logger.warn(message);
    }

    error(message: string) {
        this.logger.error(message);
    }

    debug?(message: string) {
        this.logger.debug(message);
    }
}

export default new WinstonLogger();
