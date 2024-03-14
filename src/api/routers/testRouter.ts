import express, { Request, Response } from 'express';
import { MUser } from '../../models/User';
import testHandler from '../controllers/testHandler';

const testRouter = express.Router();

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test Get Route
 *     description: This is a test route that returns something.
 *     parameters:
 *       - in: query
 *         name: _id
 *         schema:
 *           type: string
 *           example: 65c576efa33aa4d3a65ac68d
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       201:
 *         description: Test is route is working
 *       400:
 *         description: Bad request
 */

testRouter.get('/', testHandler);

// testRouter.post('/', (req: Request, res: Response) => {
//   // save recipe logic goes here
// });

export default testRouter;
