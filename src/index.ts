import express from 'express';
import type { Application, Request, Response } from 'express';
import initializeApp from './loaders/initializeApp';
import config from './config';

const app: Application = express();

void initializeApp();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello! This is the API for MyOnlyPans!');
});

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
