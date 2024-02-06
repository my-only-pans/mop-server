import express from 'express';
import type { Application, Request, Response } from 'express';

const app: Application = express();
const port = 3000; // You can choose any port

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from Express and TypeScript! UPDATED!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
