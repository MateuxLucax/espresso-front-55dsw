import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { useEffect, useState } from "react";
import { Recipe } from "../../models/Recipe";
import ErrorToast from "../../components/ErrorToast";
import { RecipeService } from "../../services/recipeService";

export default function ViewRecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function getRecipe() {
      if (!id) {
        setError("id da receita não informado");
        return;
      }

      try {
        setError("");
        setRecipe(await RecipeService.getRecipe(id));
      } catch (error) {
        console.error(error);
        setError("erro ao carregar receita");
      }
    }
    if (id) {
      getRecipe();
    }

    return () => {
      setRecipe(undefined);
      setError("");
    };
  }, [id]);

  console.log(recipe);

  return (
    <>
      <Header />
      <main className="w-full max-w-lg flex flex-col mt-16">
        <Title>{recipe?.title}</Title>
        <section className="flex flex-col text-lg gap-4">
          <div className="flex gap-4 justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">método</h3>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">coffee_maker</span>
                <span>{recipe?.method}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">xícaras</h3>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">local_cafe</span>
                <span>{recipe?.cups}</span>
              </div>
            </div>
          </div>
          <h3 className="font-bold">descrição</h3>
          <p>{recipe?.description}</p>
          <h3 className="font-bold">etapas</h3>
          <ol>
            {recipe?.steps.map((step, index) => (
              <li key={index}>
                {index + 1} - {step.description}
              </li>
            ))}
          </ol>
        </section>
      </main>
      {error && <ErrorToast message={error} />}
    </>
  );
}
