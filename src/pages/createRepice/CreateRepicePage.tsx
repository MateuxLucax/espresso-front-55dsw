import { useEffect, useState } from "react";
import AutocompleteInput from "../../components/AutocompleteInput";
import Header from "../../components/Header";
import Input from "../../components/Input";
import TextArea from "../../components/Textarea";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import ErrorToast from "../../components/ErrorToast";
import { RecipeService } from "../../services/recipeService";
import { useNavigate } from "react-router-dom";
import { MethodService } from "../../services/methodService";
import Title from "../../components/Title";

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
        console.error(error);
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center"
        >
          <Input
            className="w-full"
            id={"title"}
            label={"título"}
            type={"text"}
            value={title}
            onChange={setTitle}
            required={true}
            placeholder={"digite o título da receita"}
            error={""}
          />
          <div className="flex gap-4 w-full">
            <AutocompleteInput
              className="w-3/4"
              id="method"
              label="método"
              placeholder="digite o método"
              value={method}
              onChange={setMethod}
              required={true}
              options={methods}
            />
            <Input
              className="w-1/4"
              id={"cups"}
              label={"xícaras"}
              type={"number"}
              value={cups}
              minLength={1}
              onChange={(value) => {
                setCups(Number(value));
              }}
              required={true}
              placeholder={"..."}
            />
          </div>
          <TextArea
            className="w-full"
            id={"description"}
            label={"descrição"}
            value={description}
            onChange={setDescription}
            required={true}
            placeholder={"digite a descrição da receita"}
            error={""}
          />
          <div className="flex flex-col w-full">
            <p className="font-bold mb-2">etapas</p>
            <ul className="flex flex-col gap-4">
              {steps.length > 0 &&
                steps.map((step, index) => (
                  <li
                    key={index}
                    className="flex flex-row justify-normal items-center"
                  >
                    <Input
                      className="w-full h-12"
                      id={`step-${index}`}
                      type={"text"}
                      value={step}
                      onChange={(value) => {
                        const newSteps = [...steps];
                        newSteps[index] = value;
                        setSteps(newSteps);
                      }}
                      required={true}
                      style={{ height: "3rem" }}
                    />
                    <button
                      type="button"
                      className="h-12 w-12 flex justify-center items-center border-2 border-l-0 border-primary hover:opacity-80 active:opacity-70"
                      onClick={() => {
                        const newSteps = [...steps];
                        newSteps.splice(index, 1);
                        setSteps(newSteps);
                      }}
                    >
                      <i className="material-symbols-outlined">delete</i>
                    </button>
                  </li>
                ))}

              <li className="flex flex-row justify-normal  items-center">
                <Input
                  className="w-full"
                  id={"newStep"}
                  type={"text"}
                  value={newStep}
                  onChange={setNewStep}
                  placeholder={"digite a etapa"}
                  style={{ height: "3rem" }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newStep.length) return;

                    setSteps([...steps, newStep]);
                    setNewStep("");
                  }}
                  className="h-12 w-12 flex justify-center items-center border-2 border-l-0 border-primary hover:opacity-80 active:opacity-70"
                >
                  <i className="material-symbols-outlined">add</i>
                </button>
              </li>
            </ul>
          </div>
          <Checkbox id="public" text="receita pública" onClick={setPublic} />
          <Button
            className="mb-8"
            loading={loading}
            type="submit"
            text="adicionar"
            icon="library_add"
          />
        </form>
        {error && <ErrorToast message={error} />}
      </main>
    </>
  );
}
