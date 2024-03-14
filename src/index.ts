import express from 'express';
import type { Application, Request, Response } from 'express';
import initializeApp from './loaders/initializeApp';
import config from './config';
import userRouter from './api/routers/userRouter';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import testRouter from './api/routers/testRouter';
import cors from 'cors';

const router = express.Router();

const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Hello World', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: ['src/api/routers/*.ts'], // Path to the files where you have annotated your endpoints.
};

const swaggerSpec = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec));

const app: Application = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json()); // For parsing application/x-www-form-urlencoded

app.use(router);

void initializeApp();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello! This is the API for MyOnlyPans!');
});

app.use('/user', userRouter);
app.use('/test', testRouter);

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
