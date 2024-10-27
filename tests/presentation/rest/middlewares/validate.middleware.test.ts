import { Request, NextFunction, Response } from 'express';
import {
    validateSchema,
    bodyValidator,
    queryValidator,
    paramsValidator,
} from '@src/presentation/rest/middlewares/validate.middleware';
import { UnprocessableError } from '@src/presentation/rest/helpers/http-error';

jest.mock('@src/presentation/rest/helpers/http-error', () => ({
    UnprocessableError: jest.fn(),
}));

describe('Middleware validate: validateSchema', () => {
    let mockSchema: { validate: jest.Mock };
    let mockNext: NextFunction;
    let mockResponse: Partial<Response>;
    let mockRequest: Partial<Request>;
    const mockData = { key: 'invalid value' };

    beforeEach(() => {
        mockSchema = { validate: jest.fn().mockReturnValue({ error: null }) };
        mockNext = jest.fn();
    });

    test('should call next() if validation passes', () => {
        // Override
        mockSchema.validate.mockReturnValue({ error: null });

        // Execute
        validateSchema(
            mockSchema,
            mockData,
            mockResponse as Response,
            mockNext
        );

        // Assert
        expect(mockSchema.validate).toHaveBeenCalledWith(mockData);
        expect(mockNext).toHaveBeenCalled();
    });

    test('should throw error if validation fails', () => {
        const validationError = {
            details: [{ message: 'Invalid data provided' }],
        };
        // Override
        mockSchema.validate.mockReturnValue({ error: validationError });

        // Execute
        try {
            validateSchema(
                mockSchema,
                mockData,
                mockResponse as Response,
                mockNext
            );
        } catch (error: any) {
            expect(error).toBeInstanceOf(UnprocessableError);
        }

        // Assert
        expect(mockNext).not.toHaveBeenCalled();
    });

    describe('Middleware validate: body, query & params validators', () => {
        beforeEach(() => {
            mockRequest = {
                query: { key: 'value' },
                body: { key: 'value' },
                params: { key: 'value' },
            };
            // Mock only validateSchema function in this scope
            jest.spyOn(
                require('@src/presentation/rest/middlewares/validate.middleware'),
                'validateSchema'
            ).mockImplementation((_schema, data, _res, _next) => {
                return mockSchema.validate(data)
                    ? mockNext()
                    : mockNext(new UnprocessableError('Validation failed'));
            });
        });
        test('should call validateSchema with req.body', () => {
            // Execute
            const validator = bodyValidator(mockSchema);
            validator(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            // Assert
            expect(validateSchema).toHaveBeenCalledTimes(1);
            expect(validateSchema).toHaveBeenCalledWith(
                mockSchema,
                mockRequest.body,
                mockResponse,
                mockNext
            );
        });
    });

    test('should call validateSchema with req.query', () => {
        const mockRequest = {
            query: { key: 'value' },
        } as unknown as Partial<Request>;
        const validator = queryValidator(mockSchema);

        validator(mockRequest as Request, mockResponse as Response, mockNext);

        expect(validateSchema).toHaveBeenCalledWith(
            mockSchema,
            mockRequest.query,
            mockResponse,
            mockNext
        );
    });

    test('should call validateSchema with req.params', () => {
        const mockRequest = {
            params: { key: 'value' },
        } as unknown as Partial<Request>;
        const validator = paramsValidator(mockSchema);

        validator(mockRequest as Request, mockResponse as Response, mockNext);

        expect(validateSchema).toHaveBeenCalledWith(
            mockSchema,
            mockRequest.params,
            mockResponse,
            mockNext
        );
    });
});
