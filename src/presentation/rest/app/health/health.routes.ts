import { Router } from 'express';
import { HealthController } from './health.controllers';
import { IRoute } from '../common';

export default class HealthRoutes implements IRoute {
    public router = Router();
    constructor(private readonly healthController: HealthController) {
        this.healthController = healthController;
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/health/', (req, res) =>
            this.healthController.getHealth(req, res)
        );
    }
}
