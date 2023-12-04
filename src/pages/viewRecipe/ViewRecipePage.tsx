import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { useContext, useEffect, useState } from "react";
import { Recipe } from "../../models/Recipe";
import ErrorToast from "../../components/ErrorToast";
import { RecipeService } from "../../services/recipeService";
import UserContext from "../../state/user/UserContext";
import TextArea from "../../components/Textarea";
import { RecipeNote } from "../../models/RecipeNote";
import Button from "../../components/Button";
import { formatDate, parseTimestamp } from "../../services/utils";

export default function ViewRecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const [error, setError] = useState<string>("");
  const { user } = useContext(UserContext);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [notes, setNotes] = useState<RecipeNote[]>([]);
  const [newNote, setNewNote] = useState<string>("");
  const [loadingNotes, setLoadingNotes] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getRecipe() {
      if (!id) {
        setError("id da receita não informado");
        return;
      }

      try {
        setError("");
        setRecipe(await RecipeService.getRecipe(id));
      } catch (error: any) {
        if (error.status === 404) {
          navigate("/receitas");
        }
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
  }, [id, navigate]);

  async function toggleRecipeFavorite() {
    if (!recipe) return;
    try {
      setRecipe({ ...recipe, favorite: !recipe.favorite });
      if (recipe?.favorite) {
        await RecipeService.unsetRecipeAsFavorite(recipe.id);
      } else {
        await RecipeService.setRecipeAsFavorite(recipe.id);
      }
    } catch (error) {
      setRecipe({ ...recipe, favorite: !recipe.favorite });
      setError("erro ao favoritar receita");
    }
  }

  function toggleNotes() {
    if (notes.length === 0) {
      getNotes();
    }

    setShowNotes(!showNotes);
  }

  async function getNotes() {
    if (!recipe) return;
    if (loadingNotes) return;

    try {
      setLoadingNotes(true);
      setNotes(await RecipeService.getNotes(recipe.id));
    } catch (error) {
      setError("erro ao carregar notas");
    } finally {
      setLoadingNotes(false);
    }
  }

  async function addNote() {
    if (!recipe) return;
    try {
      const note = await RecipeService.saveNote(recipe.id, newNote);
      setNewNote("");
      setNotes([note, ...notes]);
    } catch (error) {
      setError("erro ao adicionar nota");
    }
  }

  async function deleteRecipeHandler() {
    if (!recipe?.id) return;
    if (!window.confirm("deseja realmente excluir esta receita?")) return;

    try {
      await RecipeService.deleteRecipe(recipe.id);
      navigate("/receitas");
    } catch (error) {
      setError("erro ao excluir receita");
    }
  }

  return (
    <>
      <Header />
      <main className="w-full max-w-lg flex flex-col mt-16 pb-8">
        <div className="flex justify-between items-center">
          <Title>{recipe?.title}</Title>
          {user && (
            <div className="flex gap-4">
              {recipe?.owner === user?.id && (
                <>
                  <button
                    className="h-12 w-12 hover:opacity-80 active:opacity-70 flex justify-center items-center transition-all"
                    title="alterar receita"
                    onClick={() => {
                      if (!recipe?.id) return;
                      navigate(`/receitas/alterar/${recipe.id}`);
                    }}
                  >
                    <span className="text-3xl text-primary material-symbols-outlined">
                      edit
                    </span>
                  </button>
                  <button
                    className="h-12 w-12 hover:opacity-80 active:opacity-70 flex justify-center items-center transition-all"
                    title="excluir receita"
                    onClick={deleteRecipeHandler}
                  >
                    <span className="text-3xl text-red-600 material-symbols-outlined">
                      delete
                    </span>
                  </button>
                </>
              )}
              <button
                className="h-12 w-12 hover:opacity-80 active:opacity-70 flex justify-center items-center transition-all"
                title="favoritar"
                onClick={toggleRecipeFavorite}
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
          )}
        </div>
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
          {user && (
            <>
              <div className="w-full h-1 bg-primary"></div>
              <section className="flex flex-col">
                <button
                  className="flex justify-between font-bold items-center text-lg w-full h-12 hover:opacity-80 active:opacity-70"
                  title={`${showNotes ? "esconder" : "mostrar"} notas`}
                  onClick={toggleNotes}
                >
                  <span>{showNotes ? "esconder" : "mostrar"} notas</span>
                  <span className="material-symbols-outlined">
                    {showNotes ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                  </span>
                </button>
                {showNotes && loadingNotes && (
                  <div className="flex justify-center">
                    <span className="material-symbols-outlined animate-spin">
                      progress_activity
                    </span>
                  </div>
                )}
                {showNotes && !loadingNotes && notes.length === 0 && (
                  <span className="text-center">nenhuma nota</span>
                )}
                {showNotes && notes.length > 0 && (
                  <ul className="flex flex-col gap-4">
                    {notes.map((note) => (
                      <li key={note.id} className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-primary">
                            {formatDate(parseTimestamp(note.createdAt))}
                          </span>
                          <button
                            className="h-12 w-12 hover:opacity-80 active:opacity-70 flex justify-center items-center transition-all"
                            title="excluir nota"
                            onClick={async () => {
                              try {
                                if (!recipe?.id) return;

                                if (
                                  !window.confirm(
                                    "deseja realmente excluir esta nota?"
                                  )
                                )
                                  return;

                                setNotes(notes.filter((n) => n.id !== note.id));
                                await RecipeService.deleteNote(
                                  recipe.id,
                                  note.id
                                );
                              } catch (error) {
                                setError("erro ao excluir nota");
                                getNotes();
                              }
                            }}
                          >
                            <span className="text-red-700 material-symbols-outlined text-xl">
                              delete
                            </span>
                          </button>
                        </div>
                        <p>{note.text}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
              <section className="flex flex-col gap-4 justify-center items-center">
                <TextArea
                  className="w-full"
                  id="nota"
                  label="nova nota"
                  placeholder="digite sua nota"
                  value={newNote}
                  onChange={setNewNote}
                />
                <Button
                  icon="post_add"
                  text="adicionar nota"
                  onClick={addNote}
                />
              </section>
            </>
          )}
        </section>
      </main>
      {error && <ErrorToast message={error} />}
    </>
  );
}
