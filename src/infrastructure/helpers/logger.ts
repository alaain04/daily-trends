import winston from 'winston';
const { combine, timestamp, printf } = winston.format;
import { ILogger } from '@src/domain/common/logger.interface';

class Logger implements ILogger {
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

    error(message: string, meta?: any[]) {
        this.logger.error(message, meta);
    }
}

export default new Logger();
