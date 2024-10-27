import { NextFunction, Request, Response } from 'express';
import LOGGER from '@src/infrastructure/helpers/logger';

export const loggingMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const start = new Date().getMilliseconds();

    res.on('finish', () => {
        const ms = new Date().getMilliseconds() - start;
        LOGGER.info(
            `${req.method} ${req.url} - Status: ${res.statusCode} - ${ms}ms`
        );
    });

    next();
};
