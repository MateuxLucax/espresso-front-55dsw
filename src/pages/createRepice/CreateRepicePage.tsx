import { useEffect, useState } from "react";
import Header from "../../components/Header";
import ErrorToast from "../../components/ErrorToast";
import { RecipeService } from "../../services/recipeService";
import { useNavigate } from "react-router-dom";
import { MethodService } from "../../services/methodService";
import Title from "../../components/Title";
import EditRecipe from "../../components/EditRecipe";

export default function CreateRecipePage() {
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
    if (steps.length === 0) return setError("adicione pelo menos uma etapa");

    try {
      setLoading(true);
      setError("");

      const recipe = await RecipeService.createRecipe({
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
        <Title>crie sua receita</Title>
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
          action="criar"
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
