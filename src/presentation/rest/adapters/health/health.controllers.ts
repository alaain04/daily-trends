import { Request, Response } from 'express';
import { GetAppHealthUseCase } from '@src/use-case/health/retrieve-health.use-case';
import { SuccessResponse } from '@src/presentation/rest/helpers/http-response';

export class AppHealthController {
    constructor(private readonly getAppHealthUseCase: GetAppHealthUseCase) {
        this.getAppHealthUseCase = getAppHealthUseCase;
    }

    async getHealth(_req: Request, res: Response) {
        const result = await this.getAppHealthUseCase.execute();
        SuccessResponse(res, result);
    }
}
