import { Request, Response } from 'express';
import IFeedUseCase from '@src/use-case/feed.use-case';
import { SuccessResponse } from '@src/presentation/rest/helpers/http-response';
import { IFeed } from '@src/domain/feed/feed.entities';

type IFeedsQuery = {
    dateFrom: Date;
    dateTo: Date;
    page: number;
    pageSize: number;
};
export default class IFeedController {
    constructor(private readonly feedUseCase: IFeedUseCase) {
        this.feedUseCase = feedUseCase;
    }

    async createFeed(req: Request, res: Response) {
        const feed: IFeed = req.body as IFeed;
        const result = await this.feedUseCase.create(feed);
        SuccessResponse(res, result);
    }

    async updateFeed(req: Request, res: Response) {
        const feed: IFeed = req.body as IFeed;
        const id: string = req.params.id as string;
        const result = await this.feedUseCase.update(id, feed);
        SuccessResponse(res, result);
    }

    async deleteFeed(req: Request, res: Response) {
        const id: string = req.params.id as string;
        const result = await this.feedUseCase.delete(id);
        SuccessResponse(res, result);
    }

    async retrieveFeedById(req: Request, res: Response) {
        const id: string = req.params.id as string;
        const result = await this.feedUseCase.getById(id);
        SuccessResponse(res, result);
    }

    async retrieveFeedsByDate(req: Request, res: Response) {
        const { dateFrom, dateTo, page, pageSize } =
            req.query as unknown as IFeedsQuery;
        const result = await this.feedUseCase.getByDates(
            new Date(dateFrom),
            new Date(dateTo),
            Number(page),
            Number(pageSize)
        );
        SuccessResponse(res, result);
    }

    async startScrapingProcess(req: Request, res: Response) {
        this.feedUseCase.startScrapingProcess();
        const message = { message: 'Process started successfully.' };
        SuccessResponse(res, message);
    }
}
