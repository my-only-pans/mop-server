import { Request, Response } from 'express';
import { MRecipe, Recipe } from '../../../models/Recipe';
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
      equipment,
      ingredients,
      searchString,
      prepTime,
      cookTime,
      difficulty,
    } = req.query as GetRecipesQueryType;

    // === FILTERS ===
    let filter: mongoose.FilterQuery<any> = { $and: [{}] };

    if (owner) {
      if (!mongoose.Types.ObjectId.isValid(owner)) {
        return res.status(400).json({ error: 'Bad Request' });
      } else {
        filter.owner = owner;
      }
    }

    // === CATEGORIES FILTER ===
    const parsedCategories = categories && JSON.parse(categories);
    if (parsedCategories?.length) {
      const categoriesFilterArr = parsedCategories.map((c: string) => ({
        categories: c,
      }));

      if (!filter.$and) {
        filter.$and = [];
      }

      filter['$and'] = [...filter.$and, ...categoriesFilterArr];
    }
    // === END OF CATEGORIES FILTER ===

    // === EQUIPMENT FILTER ===
    const parsedEquipment = equipment && JSON.parse(equipment);
    if (parsedEquipment) {
      if (!filter.$and) {
        filter.$and = [];
      }

      filter.$and.push({
        $expr: {
          $setIsSubset: ['$equipment', parsedEquipment],
        },
      });
    }
    // === END OF EQUIPMENT FILTER ===

    // INGREDIENT FILTER
    const parsedIngredients = ingredients && JSON.parse(ingredients);

    console.log('PARSED INGREDIENTS', parsedIngredients);

    if (parsedIngredients) {
      if (!filter.$and) {
        filter.$and = [];
      }

      filter.$and.push({
        $expr: {
          $setIsSubset: ['$ingredientTags', parsedIngredients],
        },
      });
    }
    // === END OF INGREDIENT FILTER ===

    // === SEARCHSTRING ===
    if (searchString) {
      const pattern = new RegExp(searchString, 'i');
      filter.$and?.push({ title: { $regex: pattern } });
    }
    // === END OF SEARCHSTRING ===

    // === PREP TIME ===
    if (prepTime !== null && prepTime !== undefined) {
      filter.$and?.push({ prepTime: { $lte: prepTime } });
    }
    // === END OF PREP TIME ===

    // === PREP TIME ===
    if (cookTime !== null && cookTime !== undefined) {
      filter.$and?.push({ cookTime: { $lte: cookTime } });
    }
    // === END OF PREP TIME ===

    // === PREP TIME ===
    if (difficulty !== null && difficulty !== undefined) {
      filter.$and?.push({ difficulty: { $lte: difficulty } });
    }
    // === END OF PREP TIME ===

    console.log('FILTER', JSON.stringify(filter));

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
