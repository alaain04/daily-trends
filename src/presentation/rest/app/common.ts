import { NextFunction, Router, Response, Request } from "express";

export interface IRoute {
  router: Router;
  initRoutes: () => void;
}
