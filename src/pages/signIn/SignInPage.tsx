import { useState } from "react";
import logo from "../../assets/svg/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event);
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
            type={"text"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required={true}
            placeholder={"digite seu email"}
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
          />
          <Button
            text={"entrar"}
            type={"submit"}
            icon={"login"}
            onClick={() => {}}
          />
        </form>
      </main>
    </>
  );
}
