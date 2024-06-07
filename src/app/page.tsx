import Link from "next/link";
import { addPresentation, fetchPresentations } from "./action";

export default async function Home() {
  const presentations = await fetchPresentations();
  return (
    <main className="max-w-screen-2xl px-4 mx-auto ">
      <form action={addPresentation}>
        <input
          className="border block p-2"
          type="text"
          name={"title"}
          placeholder="Title"
        />

        <button className="btn my-4">Add presentation</button>
      </form>

      <h1 className="mt-4">Presentation List</h1>
      <ul className="grid grid-cols-5 gap-4 mt-4">
        {presentations.map((presentation: any) => (
          <li key={presentation.id}>
            <Link
              className="border block p-4 hover:border-blue-500 hover:font-semibold"
              href={`/presentation/${presentation.id}`}
            >
              {presentation.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
