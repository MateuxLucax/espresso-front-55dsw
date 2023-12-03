import { Recipe } from "../models/Recipe";
import { RecipeNote } from "../models/RecipeNote";
import { Success } from "../models/Success";
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

  static async getMine(): Promise<Recipe[]> {
    return await Request.get({ url: "recipe/mine" });
  }

  static setRecipeAsFavorite(id: string): Promise<Success> {
    return Request.put({ url: `recipe/${id}/favorite` });
  }

  static unsetRecipeAsFavorite(id: string): Promise<Success> {
    return Request.delete({ url: `recipe/${id}/favorite` });
  }

  static getNotes(id: string): Promise<RecipeNote[]> {
    return Request.get({ url: `recipe/${id}/note` });
  }

  static saveNote(id: string, text: string): Promise<RecipeNote> {
    return Request.post({ url: `recipe/${id}/note`, body: { text } });
  }

  static deleteNote(recipeId: string, noteId: string): Promise<Success> {
    return Request.delete({ url: `recipe/${recipeId}/note/${noteId}` });
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
