import { Route, BrowserRouter, Routes } from "react-router-dom";
import LandingPage from "./pages/index/LandingPage";
import SignInPage from "./pages/signIn/SignInPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/entrar" element={<SignInPage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
