import { Request, ParamsDictionary } from 'express-serve-static-core';

export interface AuthenticatedRequest<
  Params extends ParamsDictionary = any,
  Body = any
> extends Request {
  userId?: string;
  params: Params;
  body: Body;
}
