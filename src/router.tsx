import { Route, BrowserRouter, Routes } from "react-router-dom";
import LandingPage from "./pages/index/LandingPage";
import SignInPage from "./pages/signIn/SignInPage";
import MePage from "./pages/me/MePage";
import SignUpPage from "./pages/signUp/SignUpPage";
import CreateRecipePage from "./pages/createRepice/CreateRepicePage";
import ViewRecipePage from "./pages/viewRecipe/ViewRecipePage";
import { RecipesPage } from "./pages/recipes/RecipesPage";
import { MyRecipesPage } from "./pages/myRecipes/MyRecipesPage";

// Olhar demo do react-router-dom que usei para prova (lá tem coisa do vite que é bem top também!)

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/entrar" element={<SignInPage />} />
        <Route path="/cadastrar" element={<SignUpPage />} />
        <Route path="/receitas" element={<RecipesPage />} />
        <Route path="/receitas/criar" element={<CreateRecipePage />} />
        <Route path="/receitas/minhas" element={<MyRecipesPage />} />
        <Route path="/receitas/visualizar/:id" element={<ViewRecipePage />} />
        <Route path="/me" element={<MePage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
