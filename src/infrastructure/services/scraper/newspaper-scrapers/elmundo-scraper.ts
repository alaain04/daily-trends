import { IFeed } from '@src/domain/feed/feed.entities';
import axios from 'axios';
import * as cheerio from 'cheerio';
import Scraper from './scraper';

export default class ElMundoScraper extends Scraper {
    public newspaper: string = 'El Mundo';
    protected url: string = 'https://elmundo.es';

    async getFeeds(): Promise<IFeed[]> {
        try {
            const response = await axios.get(this.url);

            const $ = cheerio.load(response.data);
            const feeds: IFeed[] = [];

            $('article').each((_index, element) => {
                const title = $(element).find('h2').text().trim();

                let author = '';
                $(element)
                    .find('a.ue-c-cover-content__link')
                    .each((_index, element) => {
                        const href = $(element).attr('href');
                        if (href?.startsWith('https://www.elmundo.es/autor/')) {
                            author = $(element).text().trim();
                        }
                    });

                let description = '';
                $(element)
                    .find('ul.ue-c-cover-content__related-links li')
                    .each((_index, descElement) => {
                        const text = $(descElement).find('a').text().trim();
                        if (text) {
                            description += text + ' ';
                        }
                    });
                description = description.trim();

                // Skip feeds without title
                if (!title) return;

                const feed = {
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
