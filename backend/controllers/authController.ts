import express, { Express, Request, Response, NextFunction } from 'express';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      throw new Error('All fields are required');
    }
  } catch (error) {}

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
