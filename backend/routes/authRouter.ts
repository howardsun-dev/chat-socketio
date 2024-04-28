import express, { Express, Request, Response } from 'express';
import { login, logout, signup } from '../controllers/authController';

const authRouter = express();

authRouter.get('/signup', signup, (req: Request, res: Response) => {
  // return console.log(res.locals.signup);
  res.status(200).send(res.locals.signup);
});

authRouter.get('/login', login, (req: Request, res: Response) => {
  res.status(200).send(res.locals.login);
});

authRouter.get('/logout', logout, (req: Request, res: Response) => {
  res.status(200).send(res.locals.logout);
});

export default authRouter;
