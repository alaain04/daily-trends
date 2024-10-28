import { IFeed } from '../feed/feed.entities';

export interface IScraperService {
    executeScrapers(): AsyncGenerator<IFeed[]>;
}
