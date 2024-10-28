import ElPaisScraper from '@src/infrastructure/services/scraper/newspaper-scrapers/elpais-scraper';
import axios from 'axios';

jest.mock('axios', () => ({
    get: jest.fn().mockResolvedValue({
        data: `<html> <body></body> </html>`,
    }),
}));

jest.mock('cheerio', () => ({
    load: jest.fn().mockImplementation(() => {
        return jest.fn().mockReturnValue({
            each: jest.fn((callback) => callback()),
            find: jest.fn().mockReturnThis(),
            text: jest.fn().mockReturnThis(),
            trim: jest.fn().mockReturnValue('feed'),
            attr: jest.fn().mockReturnThis(),
        });
    }),
}));

describe('ElPaisScraper Tests', () => {
    let elPaisScraper: ElPaisScraper;

    beforeEach(() => {
        elPaisScraper = new ElPaisScraper();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should scrape feeds successfully', async () => {
        // Execute
        const feeds = await elPaisScraper.getFeeds();

        // Assert
        expect(feeds).toHaveLength(1);
        expect(feeds[0]).toEqual({
            newspaperId: elPaisScraper.getNewspaperId(),
            feedId: 'feed',
            title: 'feed',
            author: 'feed',
            description: 'feed',
        });
    });

    test('should fail the action', async () => {
        // Define
        axios.get = jest.fn().mockRejectedValue(new Error());

        await expect(elPaisScraper.getFeeds()).rejects.toThrow(
            'Failed to scrape articles'
        );
    });
});
