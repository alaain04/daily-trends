import { Router } from "express";
import { HealthController } from "./health.controllers";
import { IRoute } from "../common";

export default class HealthRoutes implements IRoute {
  public router = Router();
  constructor(private readonly healthController: HealthController) {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(
      "/health/",
      this.healthController.getHealth.bind(this.healthController)
    );
  }
}
