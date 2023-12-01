import { Recipe } from "../models/Recipe";
import { Request } from "./request";

export class RecipeService {
  static async createRecipe(recipe: CreateRecipeDTO): Promise<Recipe> {
    return await Request.post({ url: "recipe", body: recipe });
  }

  static async getRecipe(id: string): Promise<Recipe> {
    if (localStorage.getItem("token")) {
      return await Request.get({ url: `recipe/${id}` });
    }

    return await Request.get({ url: `public/recipe/${id}`, useToken: false });
  }

  static async getAll(): Promise<Recipe[]> {
    if (localStorage.getItem("token")) {
      return await Request.get({ url: "recipe/all" });
    }

    return await Request.get({ url: "public/recipe/all", useToken: false });
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
