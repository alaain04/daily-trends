import { ILogger } from '@src/domain/common/logger.interface';
import { IFeed } from '@src/domain/feed/feed.entities';

export const feed: IFeed = {
    newspaperId: 'as',
    feedId: 'as',
    title: 'as',
    description: 'as',
    author: 'as',
    createdAt: new Date(),
};
export const savedFeed = {
    _id: '1234567',
    ...feed,
};

export class LoggerMock implements ILogger {
    info() {
        jest.fn();
    }
    error() {
        jest.fn();
    }
}
