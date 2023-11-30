import { Recipe } from "../models/Recipe";
import { Request } from "./request";

export class RecipeService {
  static async createRecipe(
    recipe: CreateRecipeDTO,
    token: string
  ): Promise<Recipe> {
    return await Request.post("recipe", recipe, {
      Authorization: `Bearer ${token}`,
    });
  }
}

export type CreateRecipeDTO = {
  title: string;
  description: string;
  method: string;
  cups: number;
  steps: string[];
  public: boolean;
};
