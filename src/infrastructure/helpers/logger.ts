import winston from 'winston';
const { combine, timestamp, printf } = winston.format;
import { Logger } from '@src/domain/common/logger.interface';

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

    error(message: string) {
        this.logger.error(message);
    }
}

export default new WinstonLogger();
