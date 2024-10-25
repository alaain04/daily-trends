import { Request, Response } from 'express';
import { GetAppHealthUseCase } from '@use-case/health/retrieve-health.use-case';
import { SuccessResponse } from '@presentation/rest/helpers/http-response';

export class HealthController {
    constructor(private readonly getAppHealth: GetAppHealthUseCase) {
        this.getAppHealth = getAppHealth;
    }

    async getHealth(_req: Request, res: Response) {
        const result = await this.getAppHealth.execute();
        SuccessResponse(res, result);
    }
}
