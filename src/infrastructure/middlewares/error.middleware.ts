import { Response, Request, NextFunction } from 'express';
import LOGGER from '@src/infrastructure/helpers/logger';
import {
    HttpCustomError,
    NotFoundError,
    ServerError,
} from '@src/presentation/rest/helpers/http-error';

interface IErrorResponse {
    message: string;
    description: string;
}

export const errorMiddleware = (
    error: HttpCustomError | Error,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!error) {
        next();
    }
    let errorResponse = new ServerError();
    const responseBody: IErrorResponse = {
        message: errorResponse.errorName,
        description: 'Something went wrong. Internal error.',
    };
    if (error instanceof HttpCustomError) {
        errorResponse = error;
        responseBody.message = error.errorName;
        responseBody.description = error?.message;
    }

    LOGGER.error(error?.message);
    res.status(errorResponse.status).send(responseBody).end();
};

export const notFoundErrorMiddleware = (req: Request, res: Response) => {
    const errorResponse = new NotFoundError();
    const responseBody: IErrorResponse = {
        message: errorResponse.errorName,
        description: `URL: ${req.originalUrl} not found.`,
    };

    res.status(errorResponse.status).send(responseBody).end();
};
