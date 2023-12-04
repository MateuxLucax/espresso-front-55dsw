import { useNavigate } from "react-router-dom";
import logo from "../../assets/svg/logo.svg";
import Button from "../../components/Button";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <main className="my-0 mx-auto max-w-md">
        <section className="h-screen h-screen-dvh flex flex-col">
          <img
            className="mt-16 h-8 w-100 mx-auto"
            src={logo}
            alt="logo do espresso (uma xícara de café ao lado do texto 'espresso')"
          />
          <div className="flex flex-col gap-8 my-8 mx-0 my-auto">
            <h1 className="font-display text-7xl text-primary">
              descubra o mundo do <span className="font-bold">café</span>
            </h1>
            <h2 className="text-2xl m-0">
              compartilhando e explorando receitas com apaixonados por café como
              você!
            </h2>
          </div>
          <Button
            text="começar"
            className="w-3/4 mx-auto mb-24"
            icon="start"
            onClick={() => {
              navigate("/receitas");
            }}
          />
        </section>
      </main>
    </>
  );
}
