import { Router } from 'express';

export interface IRoute {
    router: Router;
    initRoutes: () => void;
}
