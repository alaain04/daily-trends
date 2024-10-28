import { Request, Response, NextFunction } from 'express';
import {
    errorMiddleware,
    notFoundErrorMiddleware,
} from '@src/infrastructure/middlewares/error.middleware';

describe('Middleware Tests', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;
    beforeEach(() => {
        mockReq = { originalUrl: '/test-url' };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            end: jest.fn(),
        };
        mockNext = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('errorMiddleware', () => {
        it('should handle ServerError by default', () => {
            const error = new Error('Default error');

            errorMiddleware(
                error,
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.send).toHaveBeenCalledWith({
                message: 'Internal Error',
                description: 'Something went wrong. Internal error.',
            });
            expect(mockRes.end).toHaveBeenCalled();
        });

        it('should call next if no error is provided', () => {
            errorMiddleware(
                undefined as unknown as Error,
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe('notFoundErrorMiddleware', () => {
        it('should respond with a Not Found', () => {
            notFoundErrorMiddleware(mockReq as Request, mockRes as Response);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.send).toHaveBeenCalledWith({
                message: 'Not Found',
                description: 'URL: /test-url not found.',
            });
            expect(mockRes.end).toHaveBeenCalled();
        });
    });
});
