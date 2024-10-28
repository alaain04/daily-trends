import { IFeed } from '@src/domain/feed/feed.entities';
import axios from 'axios';

import * as cheerio from 'cheerio';
import Scraper from './scraper';

export default class ElPaisScraper extends Scraper {
    public newspaper: string = 'El Pais';
    protected url: string = 'https://elpais.com/';
    protected scrapeRate: number = 10000;

    async getFeeds(): Promise<IFeed[]> {
        try {
            const response = await axios.get(this.url);
            const $ = cheerio.load(response.data);
            const feeds: IFeed[] = [];

            $('article').each((_index, element) => {
                const title = $(element).find('h2').text().trim();
                const author =
                    $(element).find('.c_a_a').text().trim() || 'Unknown';

                const description =
                    $(element).find('p').text().trim() ?? 'No Description';

                // Skip feeds without title
                if (!title) return;

                const feed: IFeed = {
                    newspaperId: this.getNewspaperId(),
                    feedId: this.getFeedId(title),
                    title,
                    author,
                    description,
                };
                feeds.push(feed);
            });

            return Promise.resolve(feeds);
            /*eslint-disable @typescript-eslint/no-unused-vars */
        } catch (error) {
            throw new Error('Failed to scrape articles');
        }
    }
}
