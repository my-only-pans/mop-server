import express, { Request, Response } from 'express';
import { MUser } from '../../models/User';
import testHandler from '../controllers/testHandler';
import createRecipeDraft from '../controllers/recipe/createRecipeDraft';
import authMiddleWare from '../../utils/authMiddleware';

const recipeRouter = express.Router();

/**
 * @swagger
 * /recipe/draft:
 *   post:
 *     summary: Create Recipe Draft
 *     description: Creates a new recipe draft.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - prepTime
 *               - cookTime
 *               - serving
 *             properties:
 *               title:
 *                 type: string
 *                 example: Fried Chicken
 *               description:
 *                 type: string
 *                 example: The best fried chicken you'll ever taste
 *               cookTime:
 *                 type: number
 *                 example: 20
 *               prepTime:
 *                 type: number
 *                 example: 15
 *               serving:
 *                 type: number
 *                 example: 2
 *               categories:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: chicken
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

recipeRouter.post('/draft', authMiddleWare, createRecipeDraft);

// recipeRouter.post('/', createRecipeDraft);

export default recipeRouter;
