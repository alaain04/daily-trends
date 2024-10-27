import { IErrorHandler } from '@src/domain/common/error-handler';
import { BadRequestError } from '@src/presentation/rest/helpers/http-error';

export default class ErrorHandler implements IErrorHandler {
    handleError(error: string) {
        new BadRequestError(error);
    }
}
