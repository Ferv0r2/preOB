import { useRouter } from "../hooks/useRouter";

function About() {
  const { pop } = useRouter();

  return (
    <main className="container">
      <h1>About</h1>
      <button type="button" onClick={() => pop()}>
        Back
      </button>
    </main>
  );
}

export default About;
