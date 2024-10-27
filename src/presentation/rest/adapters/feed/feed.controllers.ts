import { Request, Response } from 'express';
import FeedUseCase from '@src/use-case/feed.use-case';
import { SuccessResponse } from '@src/presentation/rest/helpers/http-response';
import { Feed } from '@src/domain/feed/feed.entities';

export default class FeedController {
    constructor(private readonly feedUseCase: FeedUseCase) {
        this.feedUseCase = feedUseCase;
    }

    async createFeed(req: Request, res: Response) {
        const feed: Feed = req.body as Feed;
        const result = await this.feedUseCase.create(feed);
        SuccessResponse(res, result);
    }

    async updateFeed(req: Request, res: Response) {
        const feed: Feed = req.body as Feed;
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
        const dateFrom = new Date(req.query.dateFrom as string);
        const dateTo = new Date(req.query.dateTo as string);

        const result = await this.feedUseCase.getByDates(dateFrom, dateTo);
        SuccessResponse(res, result);
    }
}