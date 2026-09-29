import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import "./index.css";
import App from "./App.jsx";

function Root() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    let animationFrame;

    function raf(time) {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    }

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
