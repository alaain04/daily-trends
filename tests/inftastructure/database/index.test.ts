import mongoose, { Mongoose } from 'mongoose';
import MongoDBSingleton from '@src/infrastructure/database';
import config from '@src/infrastructure//helpers/config';
import { LoggerMock } from '@tests/constants';
jest.mock('mongoose');

describe('MongoDBSingleton', () => {
    let mongoDBSingleton = MongoDBSingleton;
    const LOGGER = new LoggerMock();
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new instance of the database connection', async () => {
        const mockConnect = mongoose.connect as jest.MockedFunction<
            typeof mongoose.connect
        >;
        mockConnect.mockResolvedValueOnce({} as Mongoose);

        const connection = await mongoDBSingleton.getInstance();

        expect(connection).toBeDefined();
        expect(mongoDBSingleton.connection).toBe(connection);
        expect(mockConnect).toHaveBeenCalledWith(config.DATABASE_URI);
    });

    it('should return the same instance on subsequent calls', async () => {
        const mockConnect = mongoose.connect as jest.MockedFunction<
            typeof mongoose.connect
        >;
        mockConnect.mockResolvedValueOnce({} as Mongoose);

        const firstConnection = await mongoDBSingleton.getInstance();
        const secondConnection = await mongoDBSingleton.getInstance();

        expect(firstConnection).toBe(secondConnection);
    });
});
