import { RecipeStep } from "./RecipeStep";

export type Recipe = {
  id: string;
  title: string;
  description: string;
  method: string;
  cups: number;
  steps: RecipeStep[];
  public: boolean;
  favorite?: boolean;
};
