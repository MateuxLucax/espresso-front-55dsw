import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/index/LandingPage";
import SignInPage from "./pages/signIn/SignInPage";
import SignUpPage from "./pages/signUp/SignUpPage";
import CreateRecipePage from "./pages/createRepice/CreateRepicePage";
import ViewRecipePage from "./pages/viewRecipe/ViewRecipePage";
import { RecipesPage } from "./pages/recipes/RecipesPage";
import { MyRecipesPage } from "./pages/myRecipes/MyRecipesPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/entrar" element={<SignInPage />} />
        <Route path="/cadastrar" element={<SignUpPage />} />
        <Route path="/receitas" element={<RecipesPage />} />
        <Route
          path="/receitas/criar"
          element={
            <Protected>
              <CreateRecipePage />
            </Protected>
          }
        />
        <Route
          path="/receitas/minhas"
          element={
            <Protected>
              <MyRecipesPage />
            </Protected>
          }
        />
        <Route path="/receitas/visualizar/:id" element={<ViewRecipePage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function Protected({ children }: { children: React.ReactNode }) {
  const user = localStorage.getItem("user");

  if (user) {
    return <>{children}</>;
  }

  return <Navigate to="/entrar" />;
}
