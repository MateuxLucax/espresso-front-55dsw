import { Link } from "react-router-dom";
import Title from "./Title";
import { Recipe } from "../models/Recipe";
import { User } from "../models/User";
import { useState } from "react";

export interface RecipeListProps {
  title: string;
  recipes: Recipe[];
  toggleRecipeFavorite: (recipe: Recipe) => void;
  user?: User;
}

export default function RecipeList({
  title,
  recipes,
  toggleRecipeFavorite,
  user,
}: RecipeListProps) {
  const [favoriteOnly, setFavoriteOnly] = useState<boolean>(false);

  function toggleFavoriteOnly() {
    setFavoriteOnly(!favoriteOnly);
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Title>{title}</Title>
        {user && (
          <button
            title={favoriteOnly ? "mostrar todas" : "mostrar favoritas"}
            onClick={toggleFavoriteOnly}
            className={`h-12 w-12 hover:opacity-80 active:opacity-70 flex justify-center items-center transition-all ${
              favoriteOnly ? "text-yellow-600" : "text-gray-400"
            }`}
          >
            <span className="material-symbols-outlined text-3xl">
              hotel_class
            </span>
          </button>
        )}
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-8 ">
        {recipes?.map((recipe) => {
          if (favoriteOnly && !recipe.favorite) return null;

          return (
            <Link
              key={recipe.id}
              to={`/receitas/visualizar/${recipe.id}`}
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
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    toggleRecipeFavorite(recipe);
                  }}
                >
                  <span
                    className={`material-symbols-outlined text-3xl transition-all ${
                      recipe?.favorite ? "text-yellow-600" : "text-gray-400"
                    }`}
                  >
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
          );
        })}
      </section>
    </>
  );
}
