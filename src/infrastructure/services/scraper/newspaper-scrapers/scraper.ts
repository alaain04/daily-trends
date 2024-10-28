import { IFeed } from '@src/domain/feed/feed.entities';

export default abstract class Scraper {
    public abstract newspaper: string;
    protected abstract url: string;

    abstract getFeeds(): Promise<IFeed[]>;

    private stringToId(str: string, len: number): string {
        return str.toLowerCase().replace(/\s/g, '').slice(0, len);
    }

    getNewspaperId(): string {
        return this.stringToId(this.newspaper, 10);
    }

    getFeedId(feedTitle: string): string {
        return this.stringToId(feedTitle, 10);
    }
}
