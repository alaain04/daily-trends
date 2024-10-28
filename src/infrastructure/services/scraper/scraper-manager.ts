import { IFeed } from '@src/domain/feed/feed.entities';
import ElMundoScraper from './newspaper-scrapers/elmundo-scraper';
import ElPaisScraper from './newspaper-scrapers/elpais-scraper';
import Scraper from './newspaper-scrapers/scraper';
import { ILogger } from '@src/domain/common/logger.interface';
import logger from '@src/infrastructure/helpers/logger';
import { IScraperService } from '@src/domain/common/scraper-service';

export default class NewspaperScraperManager implements IScraperService {
    private scrapers: Scraper[] = [new ElMundoScraper(), new ElPaisScraper()];
    private logger: ILogger = logger;

    async *executeScrapers(): AsyncGenerator<IFeed[]> {
        for (const scraper of this.scrapers) {
            try {
                this.logger.info(`Scraping feeds from ${scraper.newspaper}.`);
                const feeds: IFeed[] = await scraper.getFeeds();
                yield feeds;
            } catch (error) {
                this.logger.error(
                    `Failed to scrape articles from ${scraper.newspaper}.`,
                    error as any
                );
            }
        }
    }
}
