import { Request, Response } from 'express';
import { MRecipe } from '../../../models/Recipe';
import { mongoose } from '@typegoose/typegoose';

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
  categories?: string; // These are arrays and needed to be parsed
  ingredients?: string; // These are arrays and needed to be parsed
  equipment?: string; // These are arrays and needed to be parsed
  prepTime?: number;
  cookTime?: number;
  difficulty?: number;
}

export default async function getRecipes(req: Request, res: Response) {
  try {
    const {
      limit = 10,
      page = 1,
      sortBy = 'title',
      sortOrder = 'asc',
      owner,
      categories,
    } = req.query as GetRecipesQueryType;

    // === FILTERS ===
    let filter: { [key: string]: any } = { $and: [{}] };

    if (owner) {
      if (!mongoose.Types.ObjectId.isValid(owner)) {
        return res.status(400).json({ error: 'Bad Request' });
      } else {
        filter.owner = owner;
      }
    }

    // CATEGORIES FILTER
    const parsedCategories = categories && JSON.parse(categories);
    if (parsedCategories?.length) {
      const categoriesFilterArr = parsedCategories.map((c: string) => ({
        categories: c,
      }));

      filter = {
        ...filter,
        $and: categoriesFilterArr,
      };
    }
    // === END OF FILTER ===

    console.log(filter);

    const recipes = await MRecipe.find(filter)
      .sort({ [sortBy]: sortOrder }) // Sort
      .collation({ locale: 'en', strength: 2 }) // Ignore capitalization
      .skip((page - 1) * limit) // Pagination
      .limit(limit ?? 10); // Limit

    res.json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Bad Request' });
  }
}
