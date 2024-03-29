import { Request, Response } from 'express';
import { MRecipe } from '../../../models/Recipe';

enum RecipeSortFields {
  title = 'title',
  prepTime = 'prepTime',
  cookTime = 'cookTime',
  difficulty = 'difficulty',
}

interface GetRecipesQueryType {
  limit?: number;
  page?: number;
  sortBy?: 'title' | 'prepTime' | 'cookTime' | 'rating';
  sortOrder?: 'ascending' | 'descending' | 'asc' | 'desc';
  searchString?: string;
  owner?: string;
  categories?: string[];
  ingredients?: string[];
  equipment?: string[];
  prepTime?: number;
  cookTime?: number;
  difficulty?: number;
}

export default async function getRecipes(req: Request, res: Response) {
  const {
    limit = 10,
    page = 1,
    sortBy = 'title',
    sortOrder = 'asc',
  } = req.query as GetRecipesQueryType;
  let sort = { [sortBy]: sortOrder };

  let filter: { [key: string]: any } = {};

  const recipes = await MRecipe.find(filter)
    .sort(sort) // Sort
    .collation({ locale: 'en', strength: 2 }) // Ignore capitalization
    .skip((page - 1) * limit) // Pagination
    .limit(limit ?? 10); // Limit

  res.json(recipes);
}
