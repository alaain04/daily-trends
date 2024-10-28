import NewspaperScraperManager from '@src/infrastructure/services/scraper/scraper-manager';
import { feed, LoggerMock } from '@tests/constants';

jest.mock(
    '@src/infrastructure/services/scraper/newspaper-scrapers/elmundo-scraper',
    () => ({
        __esModule: true,
        default: jest.fn().mockImplementation(
            jest.fn(function () {
                this.newspaper = 'elmundo';
                this.getFeeds = jest.fn().mockResolvedValue([feed]);
            })
        ),
    })
);
jest.mock(
    '@src/infrastructure/services/scraper/newspaper-scrapers/elpais-scraper',
    () => ({
        __esModule: true,
        default: jest.fn().mockImplementation(
            jest.fn(function () {
                this.newspaper = 'elpais';
                this.getFeeds = jest.fn().mockResolvedValue([feed, feed]);
            })
        ),
    })
);
describe('Newspaper Scraper', () => {
    let newspaperScraper: NewspaperScraperManager;
    let logger: LoggerMock;
    beforeEach(() => {
        jest.clearAllMocks();
        newspaperScraper = new NewspaperScraperManager();
        logger = new LoggerMock();
        newspaperScraper['logger'] = logger;
    });

    test('should yield feeds from each scraper', async () => {
        const generator = newspaperScraper.executeScrapers();

        let result = await generator.next();
        expect(result.value).toEqual([feed]);

        result = await generator.next();
        expect(result.value).toEqual([feed, feed]);

        result = await generator.next();
        expect(result.done).toBe(true);
    });

    test('should log an error when a scraper fails', async () => {
        const generator = newspaperScraper.executeScrapers();

        let result = await generator.next();
        expect(result.value).toEqual([feed]);

        try {
            result = await generator.next();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }

        result = await generator.next();
        expect(result.done).toBe(true);
    });
});
