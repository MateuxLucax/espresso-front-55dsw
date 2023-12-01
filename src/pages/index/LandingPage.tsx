import logo from "../../assets/svg/logo.svg";

export default function LandingPage() {
  return (
    <>
      <main className="my-0 mx-auto">
        <section className="h-screen h-screen-dvh flex flex-col">
          <img
            className="mt-16 h-8 w-100 mx-auto"
            src={logo}
            alt="logo do espresso (uma xícara de café ao lado do texto 'espresso')"
          />
          <div className="flex flex-col gap-8 mx-0 my-auto">
            <h1 className="font-display text-7xl text-primary">
              descubra o mundo do <span className="font-bold">café</span>
            </h1>
            <h2 className="text-2xl m-0">
              compartilhando e explorando receitas com apaixonados por café como
              você!
            </h2>
          </div>
          <div
            style={{
              height: "6.4rem",
              width: "3.2rem",
              border: ".4rem solid var(--color-primary)",
              borderRadius: "3.2rem",
              margin: "0 auto 2.4rem auto",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                height: "1.6rem",
                width: "1.6rem",
                backgroundColor: "var(--color-primary)",
                borderRadius: "50%",
                margin: "auto",
                marginBottom: ".4rem",
              }}
            ></span>
          </div>
        </section>
      </main>
    </>
  );
}
