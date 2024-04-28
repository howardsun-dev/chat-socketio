// src/index.js
import express, { Express, Request, Response } from 'express';
import dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Express + TypeScript Server');
  // console.log(process.env);
});

app.get('/api/auth/signup', (req: Request, res: Response) => {
  console.log('Signup Route');
});

app.get('/api/auth/login', (req: Request, res: Response) => {
  console.log('Login Route');
});

app.get('/api/auth/logout', (req: Request, res: Response) => {
  console.log('Logout Route');
});

app.listen(port, () => {
  console.log(`[server]: Server listening at http://localhost:${port}`);
});
