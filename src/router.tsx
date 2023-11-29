import { Route, BrowserRouter, Routes } from "react-router-dom";
import LandingPage from "./pages/index/LandingPage";
import SignInPage from "./pages/signIn/SignInPage";
import MePage from "./pages/me/MePage";
import SignUpPage from "./pages/signUp/SignUpPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/entrar" element={<SignInPage />} />
        <Route path="/cadastrar" element={<SignUpPage />} />
        <Route path="/me" element={<MePage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
