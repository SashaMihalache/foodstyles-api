import { Request, Response, NextFunction } from 'express';

export const errorHandling = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).send('Internal Server Error');
};
