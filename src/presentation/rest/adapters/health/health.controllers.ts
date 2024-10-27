import { Request, Response } from 'express';
import AppHealthUseCase from '@src/use-case/health.use-case';
import { SuccessResponse } from '@src/presentation/rest/helpers/http-response';

export default class AppHealthController {
    constructor(private readonly appHealthUseCase: AppHealthUseCase) {
        this.appHealthUseCase = appHealthUseCase;
    }

    async getHealth(_req: Request, res: Response) {
        const result = await this.appHealthUseCase.execute();
        SuccessResponse(res, result);
    }
}
