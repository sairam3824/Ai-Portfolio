import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "@/styles/index.css";
import { ErrorBoundary } from "@/shared/components";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ErrorBoundary>
);
