import express, { Express, Request, Response } from 'express';
import { login, logout, signup } from '../controllers/authController';

const authRouter = express();

authRouter.post('/signup', signup, (req: Request, res: Response) => {
  console.log(res.locals.signup);
  res.status(201).json(res.locals.signup);
});

authRouter.post('/login', login, (req: Request, res: Response) => {
  res.status(200).send(res.locals.login);
});

authRouter.post('/logout', logout, (req: Request, res: Response) => {
  res.status(200).send(res.locals.logout);
});

export default authRouter;
