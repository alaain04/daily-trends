import { IBulkInsert } from '../common/bulk-insert';
import { Crud } from '../crud.interface';
import { IFeed } from './feed.entities';

export interface IFeedRepository extends Crud<IFeed> {
    findUnique(newspaperId: string, feedId: string): Promise<IFeed | null>;
    retrieveFeedByDate(
        dateFrom: Date,
        dateTo: Date,
        page: number,
        pageSize: number
    ): Promise<IFeed[]>;
    bulkUpsert(obj: IFeed[]): Promise<IBulkInsert>;
}
