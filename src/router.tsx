import { Route, BrowserRouter, Routes } from "react-router-dom";
import LandingPage from "./pages/index/LandingPage";
import SignInPage from "./pages/signIn/SignInPage";
import MePage from "./pages/me/MePage";
import SignUpPage from "./pages/signUp/SignUpPage";
import CreateRecipePage from "./pages/createRepice/CreateRepicePage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/entrar" element={<SignInPage />} />
        <Route path="/cadastrar" element={<SignUpPage />} />
        <Route path="/receitas/criar" element={<CreateRecipePage />} />
        <Route path="/me" element={<MePage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
