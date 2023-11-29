import { useContext, useState } from "react";
import logo from "../../assets/svg/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { LoginService } from "../../services/loginService";
import { useNavigate } from "react-router-dom";
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
  const userContext = useContext(UserContext);

  function checkPassword(password: string) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (regex.test(password)) {
      return true;
    }

    setPasswordError(
      "a senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial"
    );
    return false;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setEmailError("");
      setPasswordError("");
      setGeneralError("");

      if (!checkPassword(password)) {
        return;
      }

      const user = await LoginService.signup(name, email, password);
      if (user) {
        userContext.setUser(user);
        navigate("/me");
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
            onChange={(e) => {
              setName(e.target.value);
            }}
            required={true}
            placeholder={"digite seu nome"}
          />
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
            className="mt-4"
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
