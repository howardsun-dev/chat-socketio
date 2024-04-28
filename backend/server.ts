// server.js
import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv = require('dotenv');
import authRouter from './routes/authRouter';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

interface ServerError {
  log: string;
  status?: number;
  message: { err: string };
}

app.use('/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Express + TypeScript Server');
  // console.log(process.env);
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

// Global Error Handler
app.use(
  (err: ServerError, req: Request, res: Response, _next: NextFunction) => {
    const defaultErr: ServerError = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = { ...defaultErr, ...err };
    console.log(errorObj.log);
    return res.status(errorObj.status || 500).json(errorObj.message);
  },
);

app.listen(port, () => {
  console.log(`[server]: Server listening at http://localhost:${port}`);
});
