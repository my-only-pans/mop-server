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
  sortBy?:
    | 'title'
    | 'prepTime'
    | 'cookTime'
    | 'averageRating'
    | 'averageRating'
    | 'createdAt';
  sortOrder?: 'ascending' | 'descending' | 'asc' | 'desc';
  searchString?: string;
  owner?: string;
  categories?: string[]; // These are arrays and needed to be parsed
  ingredients?: string[]; // These are arrays and needed to be parsed
  equipment?: string[]; // These are arrays and needed to be parsed
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
    if (categories?.length) {
      const categoriesFilterArr = categories.map((c: string) => ({
        categories: c,
      }));

      if (!filter.$and) {
        filter.$and = [];
      }

      filter['$and'] = [...filter.$and, ...categoriesFilterArr];
    }
    // === END OF CATEGORIES FILTER ===

    // === EQUIPMENT FILTER ===
    if (equipment?.length) {
      if (!filter.$and) {
        filter.$and = [];
      }

      filter.$and.push({
        $expr: {
          $setIsSubset: ['$equipment', equipment],
        },
      });
    }
    // === END OF EQUIPMENT FILTER ===

    // INGREDIENT FILTER
    if (ingredients?.length) {
      if (!filter.$and) {
        filter.$and = [];
      }

      filter.$and.push({
        $expr: {
          $setIsSubset: ['$ingredientTags', ingredients],
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
    if (prepTime) {
      filter.$and?.push({ prepTime: { $lte: prepTime } });
    }
    // === END OF PREP TIME ===

    // === COOK TIME ===
    if (cookTime) {
      filter.$and?.push({ cookTime: { $lte: cookTime } });
    }
    // === END OF COOK TIME ===

    // === PREP TIME ===
    if (difficulty) {
      filter.$and?.push({ difficulty: { $lte: difficulty } });
    }
    // === END OF PREP TIME ===

    const total = await MRecipe.countDocuments(filter);

    const recipes = await MRecipe.find(filter)
      .populate('owner', { username: 1, _id: 1 })
      .sort({ [sortBy]: sortOrder }) // Sort
      .collation({ locale: 'en', strength: 2 }) // Ignore capitalization
      .skip((page - 1) * limit) // Pagination
      .limit(limit ?? 10); // Limit

    res.json({
      total,
      recipes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Bad Request' });
  }
}
