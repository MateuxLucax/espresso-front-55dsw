import { useContext, useState } from "react";
import logo from "../../assets/svg/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { LoginService } from "../../services/loginService";
import { Link, useNavigate } from "react-router-dom";
import ErrorToast from "../../components/ErrorToast";
import UserContext from "../../state/user/UserContext";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const { setUser } = useContext(UserContext);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (loading) return;
    event.preventDefault();

    try {
      setLoading(true);
      setEmailError("");
      setPasswordError("");
      setGeneralError("");

      const user = await LoginService.signup(name, email, password);
      debugger;
      if (user) {
        setUser(user);
        navigate("/receitas");
      }
    } catch (error: any) {
      if (error.status === 409) {
        setEmailError("email já cadastrado");
      } else {
        setGeneralError(
          "não foi possível cadastrar. tente novamente mais tarde ou entre em contato com o suporte"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main className="w-full max-w-lg my-auto self-center flex flex-col">
        <img
          className="h-8 w-100 mx-auto mb-8"
          src={logo}
          alt="logo do espresso (uma xícara de café ao lado do texto 'espresso')"
        />
        <h1 className="font-display text-primary text-4xl font-bold my-8">
          cadastrar
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4"
        >
          <Input
            id={"name"}
            label={"nome"}
            type={"text"}
            value={name}
            onChange={setName}
            required={true}
            placeholder={"digite seu nome"}
          />
          <Input
            id={"email"}
            label={"email"}
            type={"email"}
            value={email}
            onChange={setEmail}
            required={true}
            placeholder={"digite seu email"}
            error={emailError}
          />
          <Input
            id={"password"}
            label={"senha"}
            type={"password"}
            value={password}
            onChange={setPassword}
            required={true}
            placeholder={"digite sua senha"}
            error={passwordError}
          />
          <p className="leading-none">
            Já tem uma conta?{" "}
            <Link to={"/entrar"}>
              <span className="text-primary font-bold transition-all hover:opacity-80 active:opacity-70">
                Entre aqui
              </span>
            </Link>
          </p>
          <Button
            text={"cadastrar"}
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
