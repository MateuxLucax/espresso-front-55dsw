import { useContext, useEffect, useState } from "react";
import ErrorToast from "../../components/ErrorToast";
import Header from "../../components/Header";
import { Recipe } from "../../models/Recipe";
import { RecipeService } from "../../services/recipeService";
import { useNavigate } from "react-router-dom";
import UserContext from "../../state/user/UserContext";
import RecipeList from "../../components/RecipeList";

export function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string>("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getRecipe() {
      try {
        setError("");
        setRecipes(await RecipeService.getAll());
      } catch (error) {
        setError("erro ao carregar receita");
      }
    }

    getRecipe();
  }, []);

  async function toggleRecipeFavorite(recipe: Recipe) {
    if (!user) {
      navigate("/entrar");
      return;
    }

    const updatedRecipe = { ...recipe, favorite: !recipe.favorite };
    setRecipes(recipes?.map((r) => (r.id === recipe.id ? updatedRecipe : r)));

    try {
      if (recipe?.favorite) {
        await RecipeService.unsetRecipeAsFavorite(recipe.id);
      } else {
        await RecipeService.setRecipeAsFavorite(recipe.id);
      }
    } catch (error) {
      const updatedRecipe = { ...recipe, favorite: !recipe.favorite };
      setRecipes(recipes?.map((r) => (r.id === recipe.id ? updatedRecipe : r)));
      setError("erro ao favoritar receita");
    }
  }

  return (
    <>
      <Header />
      <main className="w-full max-w-6xl flex flex-col mt-16">
        <RecipeList
          title="receitas"
          recipes={recipes}
          toggleRecipeFavorite={toggleRecipeFavorite}
          user={user}
        />
      </main>
      {error && <ErrorToast message={error} />}
    </>
  );
}
