import ElMundoScraper from '@src/infrastructure/services/scraper/newspaper-scrapers/elmundo-scraper';
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
            attr: jest
                .fn()
                .mockImplementation(() => ({ startsWith: jest.fn() })),
        });
    }),
}));

describe('ElMundo Tests', () => {
    let elMundoScraper: ElMundoScraper;

    beforeEach(() => {
        elMundoScraper = new ElMundoScraper();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should scrape feeds successfully', async () => {
        // Execute
        const feeds = await elMundoScraper.getFeeds();

        // Assert
        expect(feeds).toHaveLength(1);
        expect(feeds[0]).toEqual({
            newspaperId: elMundoScraper.getNewspaperId(),
            feedId: 'feed',
            title: 'feed',
            author: '',
            description: 'feed',
        });
    });

    test('should fail the action', async () => {
        // Define
        axios.get = jest.fn().mockRejectedValue(new Error());

        await expect(elMundoScraper.getFeeds()).rejects.toThrow(
            'Failed to scrape articles'
        );
    });
});
