import { SuccessResponse } from '@src/presentation/rest/helpers/http-response';
import { Response } from 'express';

describe('HTTP Response', () => {
    let res: Partial<Response>;

    beforeEach(() => {
        jest.clearAllMocks();
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            end: jest.fn(),
        };
    });

    test('should get called correctly', async () => {
        const dataMock = { message: 'Body example' };
        SuccessResponse(res as Response, dataMock);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(dataMock);

        expect(res.end).toHaveBeenCalledTimes(1);
    });
});
