import * as bodyParser from "body-parser";
import express, { Router } from "express";
import cors from "cors";
import { errors } from "celebrate";
import config from "@infrastructure/helpers/config";
import {
  errorMiddleware,
  notFoundErrorMiddleware,
} from "@infrastructure/middlewares/error.middleware";
import { IRoute } from "@presentation/rest/app/common";
import LOGGER from "@infrastructure/helpers/logger";
import HealthRoutes from "@presentation/rest/app/health/health.routes";
import HealthComposer from "@infrastructure/di/health.composer";
import { loggingMiddleware } from "@infrastructure/middlewares/logger.middleware";
import "express-async-errors";

export class AppServer {
  protected app: express.Application = express();

  createServer() {
    this.app.use(cors());

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.all("/*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
      next();
    });

    // Inject Controller into Routes
    const routes: Router[] = [
      new HealthRoutes(new HealthComposer().controller),
    ].map((r: IRoute) => r.router);

    // Expose routes
    this.app.use(loggingMiddleware);
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
