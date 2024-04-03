import { Request, ParamsDictionary } from 'express-serve-static-core';

export interface AuthenticatedRequest<
  Query extends ParamsDictionary = any,
  Body = any
> extends Request {
  userId?: string;
  query: Query;
  body: Body;
}
