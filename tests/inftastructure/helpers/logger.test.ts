const infoMock = jest.fn();
const errorMock = jest.fn();

jest.mock('winston', () => ({
    format: {
        combine: jest.fn(),
        timestamp: jest.fn(),
        printf: jest.fn(),
    },
    createLogger: jest.fn().mockReturnValue({
        info: infoMock,
        error: errorMock,
    }),
    transports: {
        Console: jest.fn(),
    },
}));

import WinstonLogger from '@src/infrastructure/helpers/logger';

describe('WinstonLogger Singleton', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call info method with correct message', () => {
        const message = 'test message';
        WinstonLogger.info(message);
        expect(infoMock).toHaveBeenCalledTimes(1);
        expect(infoMock).toHaveBeenCalledWith(message);
    });

    it('should call error method with correct message', () => {
        const message = 'test message';
        WinstonLogger.error(message);
        expect(errorMock).toHaveBeenCalledTimes(1);
        expect(errorMock).toHaveBeenCalledWith(message);
    });
});
