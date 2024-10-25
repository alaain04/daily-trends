import { Response } from "express";

export const SuccessResponse = <T>(res: Response, data: T) => {
  const status = 200;
  res.status(status).json(data).end();
};
