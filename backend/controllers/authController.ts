import express, { Express, Request, Response, NextFunction } from 'express';

export const signup = (req: Request, res: Response, next: NextFunction) => {
  res.locals.signup = 'Signup';
  return next();
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  res.locals.login = 'Login';
  return next();
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.locals.logout = 'Logout';
  return next();
};
