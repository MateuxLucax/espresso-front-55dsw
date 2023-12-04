import AutocompleteInput from "./AutocompleteInput";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";
import TextArea from "./Textarea";

export interface EditRecipeProps {
  title: string;
  method: string;
  cups: number;
  description: string;
  steps: string[];
  public: boolean;
  loading: boolean;
  methods: string[];
  newStep: string;
  action: string;
  setTitle: (value: string) => void;
  setMethod: (value: string) => void;
  setCups: (value: number) => void;
  setDescription: (value: string) => void;
  setSteps: (value: string[]) => void;
  setPublic: (value: boolean) => void;
  setNewStep: (value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function EditRecipe({
  title,
  method,
  cups,
  description,
  steps,
  public: publicRecipe,
  loading,
  methods,
  newStep,
  action,
  setTitle,
  setMethod,
  setCups,
  setDescription,
  setSteps,
  setPublic,
  setNewStep,
  handleSubmit,
}: EditRecipeProps) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
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
                  className="h-12 w-12 flex justify-center items-center border-2 border-l-0 text-primary border-primary hover:bg-primary hover:text-background active:opacity-70 transition-all"
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
              className="h-12 w-12 flex justify-center items-center border-2 border-l-0 text-primary border-primary hover:bg-primary hover:text-background active:opacity-70 transition-all"
            >
              <i className="material-symbols-outlined">add</i>
            </button>
          </li>
        </ul>
      </div>
      <Checkbox
        checked={publicRecipe}
        id="public"
        text="receita pública"
        onClick={setPublic}
      />
      <Button
        className="mb-8"
        loading={loading}
        type="submit"
        text={action}
        icon="library_add"
      />
    </form>
  );
}
