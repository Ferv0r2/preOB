import { useRouter } from "../hooks/useRouter";

function Home() {
  const { push } = useRouter();

  return (
    <main className="container">
      <div>
        <h1>Home</h1>
        <button type="button" onClick={() => push("/about")}>
          Go About
        </button>
      </div>
    </main>
  );
}

export default Home;
