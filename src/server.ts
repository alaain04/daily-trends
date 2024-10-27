import * as bodyParser from 'body-parser';
import express, { Router } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import config from '@src/infrastructure/helpers/config';
import {
    errorMiddleware,
    notFoundErrorMiddleware,
} from '@src/infrastructure/middlewares/error.middleware';
import { IRoute } from '@src/presentation/rest/adapters/common';
import LOGGER from '@src/infrastructure/helpers/logger';
import HealthRoutes from '@src/presentation/rest/adapters/health/health.routes';
import HealthComposer from '@src/infrastructure/di/health.composer';
import { loggingMiddleware } from '@src/infrastructure/middlewares/logger.middleware';
import 'express-async-errors';

export class AppServer {
    app: express.Application = express();

    run() {
        this.app.use(cors());

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.all('/*', (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
            next();
        });
        this.app.use(loggingMiddleware);

        // Inject Controller into Routes
        const routes: Router[] = [
            new HealthRoutes(new HealthComposer().controller),
        ].map((r: IRoute) => r.router);
        // Expose routes
        this.app.use(`/api/${config.SERVER_VERSION}`, routes);

        // Handle JOI validations
        this.app.use(errors());

        // Handle errors
        this.app.use(errorMiddleware);

        this.app.listen(config.SERVER_PORT, () => {
            LOGGER.info(`Server Running on port: ${config.SERVER_PORT}`);
        });

        this.app.use(notFoundErrorMiddleware);
    }
}
