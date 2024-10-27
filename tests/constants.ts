import { Feed } from '@src/domain/feed/feed.entities';

export const feed: Feed = {
    newspaperId: 'as',
    feedId: 'as',
    title: 'as',
    description: 'as',
    author: 'as',
    publishedAt: new Date(),
    createdAt: new Date(),
};
export const savedFeed = {
    _id: '1234567',
    ...feed,
};
