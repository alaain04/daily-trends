import { Router } from 'express';
import AppHealthController from './health.controllers';
import { IRoute } from '../common';

export default class HealthRoutes implements IRoute {
    public router = Router();
    constructor(private readonly appHealthController: AppHealthController) {
        this.appHealthController = appHealthController;
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/health', (req, res) =>
            this.appHealthController.getHealth(req, res)
        );
    }
}
