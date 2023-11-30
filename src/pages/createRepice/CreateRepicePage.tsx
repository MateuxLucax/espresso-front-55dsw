import { useContext, useState } from "react";
import AutocompleteInput from "../../components/AutocompleteInput";
import Header from "../../components/Header";
import Input from "../../components/Input";
import TextArea from "../../components/Textarea";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import UserContext from "../../state/user/UserContext";
import ErrorToast from "../../components/ErrorToast";
import { RecipeService } from "../../services/recipeService";

export default function CreateRecipePage() {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cups, setCups] = useState(1);
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [newStep, setNewStep] = useState("");
  const [pubic, setPublic] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    if (steps.length === 0) return setError("adicione pelo menos uma etapa");

    try {
      setLoading(true);
      setError("");

      const recipe = await RecipeService.createRecipe(
        {
          title,
          method,
          cups,
          description,
          steps,
          public: pubic,
        },
        user?.token || ""
      );

      if (recipe) {
        setTitle("");
        setMethod("");
        setCups(1);
        setDescription("");
        setSteps([]);
        setNewStep("");
        setPublic(false);
      } else {
        throw new Error();
      }
    } catch (error: any) {
      setError("não foi possível criar a receita");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="w-full max-w-lg self-center flex flex-col mt-16">
        <h1 className="text-primary font-display text-4xl font-bold my-12">
          crie sua receita
        </h1>
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
              options={["b", "bb", "bbb", "bbbb", "bbbbb", "bbbbbb"]}
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
