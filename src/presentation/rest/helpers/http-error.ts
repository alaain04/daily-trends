export abstract class HttpCustomError extends Error {
  abstract errorName: string;
  abstract status: number;
}

export class BadRequestError extends HttpCustomError {
  status = 400;
  errorName = "Bad Request";
}

export class NotFoundError extends HttpCustomError {
  status = 404;
  errorName = "Not Found";
}

export class UnprocessableError extends HttpCustomError {
  status = 422;
  errorName = "Unprocessable Entity";
}

export class ServerError extends HttpCustomError {
  status = 500;
  errorName = "Internal Error";
}
