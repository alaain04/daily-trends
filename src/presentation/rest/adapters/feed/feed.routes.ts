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
        this.router.get(
            '/feeds',
            [queryValidator(queryParams)],
            (req: Request, res: Response) =>
                this.feedController.retrieveFeedsByDate(req, res)
        );

        this.router.get(
            '/feeds/:id',
            [paramsValidator(idParam)],
            (req: Request, res: Response) =>
                /**
                   #swagger.summary = "Retrieve a single feed by UUID"
                   #swagger.description = "Get details of a specific feed using its UUID."
                   #swagger.parameters[0] = {
                     in: "path",
                     name: "id",
                     required: true,
                     type: "string",
                     description: "Unique UUID of the feed to retrieve."
                   }
                 */
                this.feedController.retrieveFeedById(req, res)
        );

        this.router.post('/feeds/scrape', (req: Request, res: Response) =>
            this.feedController.startScrapingProcess(req, res)
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
