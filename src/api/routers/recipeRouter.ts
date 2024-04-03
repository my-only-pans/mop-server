import express, { Request, Response } from 'express';
import { MUser } from '../../models/User';
import testHandler from '../controllers/testHandler';
import createRecipeDraft from '../controllers/recipe/createRecipeDraft';
import authMiddleWare from '../../utils/authMiddleware';
import getRecipeDraft from '../controllers/recipe/getRecipeDraft';
import saveRecipeDraft from '../controllers/recipe/saveRecipeDraft';
import publishRecipe from '../controllers/recipe/publishRecipe';
import getRecipe from '../controllers/recipe/getRecipe';
import getRecipes from '../controllers/recipe/getRecipes';
import rateRecipe from '../controllers/recipe/rateRecipe';
import getRecipeDrafts from '../controllers/recipe/getRecipeDrafts';
import saveRecipe from '../controllers/recipe/saveRecipe';
import getSavedRecipes from '../controllers/recipe/getSavedRecipes';
import unsaveRecipe from '../controllers/recipe/unsaveRecipe';

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
 *                   type: string
 *                   example: [chicken, salt, pepper]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

recipeRouter.post('/draft', authMiddleWare, createRecipeDraft);

// TODO Annotation - Get Recipe Draft
recipeRouter.get('/draft/:_id', authMiddleWare, getRecipeDraft);

// TODO Annotation - Get Recipe Drafts
recipeRouter.get('/draft', authMiddleWare, getRecipeDrafts);

// TODO Annotation - Save Recipe Draft
recipeRouter.put('/draft', authMiddleWare, saveRecipeDraft);

// TODO Annotation - Publish Recipe
recipeRouter.post('/', authMiddleWare, publishRecipe);

// TODO Annotation - Get Recipes
recipeRouter.get('/', getRecipes);

// TODO Annotation - Rate Recipe
recipeRouter.post('/rate', authMiddleWare, rateRecipe);

// TODO Annotation - Save Recipe
recipeRouter.post('/saved', authMiddleWare, saveRecipe);

// TODO Annotation - Unsave Recipe
recipeRouter.delete('/saved', authMiddleWare, unsaveRecipe);

// TODO Annotation - Get Saved Recipe
recipeRouter.get('/saved', authMiddleWare, getSavedRecipes);

// TODO Annotation - Get Recipe
recipeRouter.get('/:_id', getRecipe);

export default recipeRouter;

//
//
