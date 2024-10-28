import { Router, Request, Response } from 'express';
import AppHealthController from './health.controllers';
import { IRoute } from '../common';

export default class HealthRoutes implements IRoute {
    public router = Router();
    constructor(private readonly appHealthController: AppHealthController) {
        this.appHealthController = appHealthController;
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/health', (req: Request, res: Response) =>
            /**
             * #swagger.summary = "Check application health"
             * #swagger.description = "Returns the health status of the application"
             * #swagger.responses[200] = { description: "Application is healthy" }
             */
            this.appHealthController.getHealth(req, res)
        );
    }
}
