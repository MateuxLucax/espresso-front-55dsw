import { useParams } from "react-router-dom";
import Header from "../../components/Header";

export default function RecipePage() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <main className="mt-16">
        <h1>Recipe Page {id}</h1>
      </main>
    </>
  );
}
