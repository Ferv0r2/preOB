import Home from "./pages/Home";
import About from "./pages/About";
import { Router } from "./components/Router";
import { Route } from "./components/Route";

function App() {
  return (
    <>
      <Router>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Router>
    </>
  );
}

export default App;
