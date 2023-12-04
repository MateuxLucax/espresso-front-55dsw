import { useEffect, useState } from "react";
import Header from "../../components/Header";
import ErrorToast from "../../components/ErrorToast";
import { RecipeService } from "../../services/recipeService";
import { useNavigate, useParams } from "react-router-dom";
import { MethodService } from "../../services/methodService";
import Title from "../../components/Title";
import EditRecipe from "../../components/EditRecipe";

export default function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cups, setCups] = useState(1);
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [newStep, setNewStep] = useState("");
  const [pubic, setPublic] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [methods, setMethods] = useState<string[]>([]);

  useEffect(() => {
    async function getRecipe() {
      if (!id) {
        setError("id da receita não informado");
        return;
      }

      try {
        setError("");
        const recipe = await RecipeService.getRecipe(id);
        if (recipe) {
          setTitle(recipe.title);
          setMethod(recipe.method);
          setCups(recipe.cups);
          setDescription(recipe.description);
          setSteps(recipe.steps.map((step) => step.description));
          setPublic(recipe.public);
        } else {
          throw new Error();
        }
      } catch (error) {
        setError("erro ao carregar receita");
      }
    }
    if (id) {
      getRecipe();
    }

    return () => {
      setError("");
    };
  }, [id]);

  useEffect(() => {
    async function getMethods() {
      try {
        const methods = await MethodService.all();
        if (methods) {
          setMethods(methods);
        }
      } catch (error: any) {
        setError("não foi possível carregar os métodos");
      }
    }
    getMethods();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    if (!id) return;
    if (steps.length === 0) return setError("adicione pelo menos uma etapa");

    try {
      setLoading(true);
      setError("");

      const recipe = await RecipeService.updateRecipe(id, {
        title,
        method,
        cups,
        description,
        steps,
        public: pubic,
      });

      if (recipe) {
        setTitle("");
        setMethod("");
        setCups(1);
        setDescription("");
        setSteps([]);
        setNewStep("");
        setPublic(false);
        navigate(`/receitas/visualizar/${recipe.id}`);
      } else {
        throw new Error();
      }
    } catch (error: any) {
      if (error.status === 404) {
        setError("método não encontrado");
      } else {
        setError("não foi possível criar a receita");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="w-full max-w-lg self-center flex flex-col mt-16">
        <Title>alterar receita</Title>
        <EditRecipe
          title={title}
          method={method}
          cups={cups}
          description={description}
          steps={steps}
          public={pubic}
          loading={loading}
          methods={methods}
          newStep={newStep}
          action="alterar"
          setTitle={setTitle}
          setMethod={setMethod}
          setCups={setCups}
          setDescription={setDescription}
          setSteps={setSteps}
          setPublic={setPublic}
          setNewStep={setNewStep}
          handleSubmit={handleSubmit}
        />
        {error && <ErrorToast message={error} />}
      </main>
    </>
  );
}
