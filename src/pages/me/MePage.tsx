import { useContext } from "react";
import UserContext from "../../state/user/UserContext";
import Header from "../../components/Header";

export default function MePage() {
  const { user } = useContext(UserContext);

  if (!user)
    return (
      <main className="max-w-lg my-auto self-center flex flex-col">
        <h1 className="font-display text-primary text-4xl font-bold my-8">
          você não está logado
        </h1>
      </main>
    );

  return (
    <>
      <Header />
      <main className="max-w-lg my-auto self-center flex flex-col">
        <h1 className="font-display text-primary text-4xl font-bold my-8">
          {user?.name}
        </h1>
      </main>
    </>
  );
}
