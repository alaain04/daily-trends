import { Crud } from '../crud.interface';
import { Feed } from './feed.entities';

export interface FeedRepository extends Crud<Feed> {
    findUnique(newspaperId: string, feedId: string): Promise<Feed | null>;
    retrieveFeedByDate(dateFrom: Date, dateTo: Date): Promise<Feed[]>;
}
