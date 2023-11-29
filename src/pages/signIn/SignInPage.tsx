import { useState } from "react";
import logo from "../../assets/svg/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { LoginService } from "../../services/loginService";
import { useNavigate } from "react-router-dom";
import ErrorToast from "../../components/ErrorToast";

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setEmailError("");
      setPasswordError("");
      setGeneralError("");
      const user = await LoginService.login(email, password);
      if (user) {
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      if (error.status === 404) {
        setEmailError("email não encontrado");
      } else if (error.status === 401) {
        setPasswordError("senha incorreta");
      } else {
        setGeneralError("erro ao fazer login");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main className="max-w-lg my-auto self-center flex flex-col">
        <img
          className="h-8 w-100 mx-auto mb-8"
          src={logo}
          alt="logo do espresso (uma xícara de café ao lado do texto 'espresso')"
        />
        <h1 className="font-display text-primary text-4xl font-bold my-8">
          entrar
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4"
        >
          <Input
            id={"email"}
            label={"email"}
            type={"email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required={true}
            placeholder={"digite seu email"}
            error={emailError}
          />
          <Input
            id={"password"}
            label={"senha"}
            type={"password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required={true}
            placeholder={"digite sua senha"}
            error={passwordError}
          />
          <Button
            text={"entrar"}
            type={"submit"}
            icon={"login"}
            loading={loading}
          />
        </form>
        {generalError && <ErrorToast message={generalError} />}
      </main>
    </>
  );
}
