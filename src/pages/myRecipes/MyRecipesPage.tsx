import { useEffect, useState } from "react";
import ErrorToast from "../../components/ErrorToast";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { Recipe } from "../../models/Recipe";
import { RecipeService } from "../../services/recipeService";
import { Link } from "react-router-dom";

export function MyRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function getRecipe() {
      try {
        setError("");
        setRecipes(await RecipeService.getMine());
      } catch (error) {
        setError("erro ao carregar receita");
      }
    }

    getRecipe();
  }, []);

  return (
    <>
      <Header />
      <main className="w-full max-w-6xl flex flex-col mt-16">
        <div className="flex">
          <Title>minhas receitas</Title>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-8 ">
          {recipes?.map((recipe) => (
            <Link
              key={recipe.id}
              to={`visualizar/${recipe.id}`}
              className="flex flex-col border-4 border-primary text-primary hover:text-background hover:bg-primary cursor-pointer active:opacity-80  p-4 gap-4 transition-all"
            >
              <div className="flex justify-between items-center">
                <h2
                  className="font-display font-bold text-2xl line-clamp-1"
                  title={recipe.title}
                >
                  {recipe.title}
                </h2>
                <button
                  className="flex justify-center items-center w-12 h-12 hover:opacity-80 active:opacity-70"
                  title="favoritar"
                >
                  {/* <span className="material-symbols-outlined text-yellow-600 text-3xl"> */}
                  <span className="material-symbols-outlined text-2xl">
                    star
                  </span>
                </button>
              </div>
              <div className="flex gap-4 justify-between">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold">método</h3>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined">
                      coffee_maker
                    </span>
                    <span>{recipe?.method}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold">xícaras</h3>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined">
                      local_cafe
                    </span>
                    <span>{recipe?.cups}</span>
                  </div>
                </div>
              </div>
              <p className="line-clamp-3">{recipe.description}</p>
            </Link>
          ))}
        </section>
      </main>
      {error && <ErrorToast message={error} />}
    </>
  );
}
