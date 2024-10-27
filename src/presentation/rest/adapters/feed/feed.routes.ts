import { Router, Request, Response } from 'express';
import { IRoute } from '../common';
import FeedController from './feed.controllers';
import {
    bodyValidator,
    paramsValidator,
    queryValidator,
} from '../../middlewares/validate.middleware';
import { create, idParam, queryParams, update } from './feed.schema';

export default class FeedRoutes implements IRoute {
    public router = Router();
    constructor(private readonly feedController: FeedController) {
        this.feedController = feedController;
        this.initRoutes();
    }

    public initRoutes() {
        // this.router.get(
        //     '/feeds',
        //     [queryValidator(queryParams)],
        //     (req: Request, res: Response) =>
        //         this.feedController.retrieveFeedsByDate(req, res)
        // );

        this.router.get(
            '/feeds/:id',
            [paramsValidator(idParam)],
            (req: Request, res: Response) =>
                this.feedController.retrieveFeedById(req, res)
        );

        this.router.post(
            '/feeds',
            [bodyValidator(create)],
            (req: Request, res: Response) =>
                this.feedController.createFeed(req, res)
        );

        this.router.put(
            '/feeds/:id',
            [paramsValidator(idParam), bodyValidator(update)],
            (req: Request, res: Response) =>
                this.feedController.updateFeed(req, res)
        );

        this.router.delete(
            '/feeds/:id',
            [paramsValidator(idParam)],
            (req: Request, res: Response) =>
                this.feedController.deleteFeed(req, res)
        );
    }
}
