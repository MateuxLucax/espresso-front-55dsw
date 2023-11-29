import { useContext } from "react";
import UserContext from "../../state/user/UserContext";

export default function MePage() {
  const userContext = useContext(UserContext);

  if (!userContext)
    return (
      <main className="max-w-lg my-auto self-center flex flex-col">
        <h1 className="font-display text-primary text-4xl font-bold my-8">
          você não está logado
        </h1>
      </main>
    );

  return (
    <main className="max-w-lg my-auto self-center flex flex-col">
      <h1 className="font-display text-primary text-4xl font-bold my-8">
        {userContext.user?.name}
      </h1>
    </main>
  );
}
