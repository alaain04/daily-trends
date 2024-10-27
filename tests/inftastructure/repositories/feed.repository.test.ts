import FeedModel from '@src/infrastructure/database/models/feed.model';
import FeedRepositoryImpl from '@src/infrastructure/repositories/feed.repository';
import { feed } from '@tests/constants';

jest.mock('@src/infrastructure/database/models/feed.model');

describe('FeedRepositoryImpl', () => {
    let feedRepository: FeedRepositoryImpl;

    beforeEach(() => {
        jest.clearAllMocks();
        feedRepository = new FeedRepositoryImpl();
    });

    it('should create a new feed', async () => {
        (FeedModel.prototype.save as jest.Mock).mockResolvedValue(feed);

        const result = await feedRepository.create(feed);

        expect(result).toEqual(feed);
        expect(FeedModel).toHaveBeenCalledWith(feed);
        expect(FeedModel.prototype.save).toHaveBeenCalled();
    });

    it('should update an existing feed', async () => {
        const updatedFeed = { ...feed, title: 'Updated Feed' };
        (FeedModel.findOneAndUpdate as jest.Mock).mockResolvedValue(
            updatedFeed
        );

        const result = await feedRepository.update('123', updatedFeed);

        expect(result).toEqual(updatedFeed);
        expect(FeedModel.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: '123' },
            updatedFeed,
            { new: true }
        );
    });

    it('should retrieve a feed by ID', async () => {
        (FeedModel.findById as jest.Mock).mockResolvedValue(feed);

        const result = await feedRepository.getById('123');

        expect(result).toEqual(feed);
        expect(FeedModel.findById).toHaveBeenCalledWith('123');
    });

    it('should delete a feed by ID', async () => {
        (FeedModel.findByIdAndDelete as jest.Mock).mockResolvedValue(feed);

        const result = await feedRepository.delete('123');

        expect(result).toEqual(feed);
        expect(FeedModel.findByIdAndDelete).toHaveBeenCalledWith({
            _id: '123',
        });
    });

    it('should find a unique feed', async () => {
        (FeedModel.findOne as jest.Mock).mockResolvedValue(feed);

        const result = await feedRepository.findUnique('newspaperId', 'feedId');

        expect(result).toEqual(feed);
        expect(FeedModel.findOne).toHaveBeenCalledWith({
            newspaperId: 'newspaperId',
            feedId: 'feedId',
        });
    });

    it('should retrieve feeds by date range', async () => {
        const dateFrom = new Date('2024-01-01');
        const dateTo = new Date('2024-12-31');
        const feeds = [feed];
        (FeedModel.find as jest.Mock).mockResolvedValue(feeds);

        const result = await feedRepository.retrieveFeedByDate(
            dateFrom,
            dateTo
        );

        expect(result).toEqual(feeds);
        expect(FeedModel.find).toHaveBeenCalledWith({
            publishedAt: { $gte: dateFrom, $lte: dateTo },
        });
    });
});
