import {
    HttpCustomError,
    BadRequestError,
    ServerError,
    NotFoundError,
    UnprocessableError,
} from '@src/presentation/rest/helpers/http-error';

describe('Custom HTTP Error', () => {
    test('should be an instance of Error', () => {
        // Override
        class MockHttpCustomError extends HttpCustomError {
            errorName = 'Mock Error';
            status = 500;
        }

        // Execute
        const error = new MockHttpCustomError('Test error message');

        // Assert
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Test error message');
        expect(error.errorName).toBe('Mock Error');
        expect(error.status).toBe(500);
    });

    test('should have a status of 400 and errorName of "Bad Request"', () => {
        // Execute
        const error = new BadRequestError('Invalid request');

        // Assert
        expect(error).toBeInstanceOf(HttpCustomError);
        expect(error).toBeInstanceOf(Error);
        expect(error.status).toBe(400);
        expect(error.errorName).toBe('Bad Request');
        expect(error.message).toBe('Invalid request');
    });

    test('should have a status of 404 and errorName of "Not Found "', () => {
        // Execute
        const error = new NotFoundError('Not Found request');

        // Assert
        expect(error).toBeInstanceOf(HttpCustomError);
        expect(error).toBeInstanceOf(Error);
        expect(error.status).toBe(404);
        expect(error.errorName).toBe('Not Found');
        expect(error.message).toBe('Not Found request');
    });

    test('should have a status of 422 and errorName of "UnprocessableError"', () => {
        // Execute
        const error = new UnprocessableError('UnprocessableError request');

        // Assert
        expect(error).toBeInstanceOf(HttpCustomError);
        expect(error).toBeInstanceOf(Error);
        expect(error.status).toBe(422);
        expect(error.errorName).toBe('Unprocessable Entity');
        expect(error.message).toBe('UnprocessableError request');
    });
    test('should have a status of 500 and errorName of "ServerError"', () => {
        // Execute
        const error = new ServerError('ServerError request');

        // Assert
        expect(error).toBeInstanceOf(HttpCustomError);
        expect(error).toBeInstanceOf(Error);
        expect(error.status).toBe(500);
        expect(error.errorName).toBe('Internal Error');
        expect(error.message).toBe('ServerError request');
    });
});
