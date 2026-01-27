import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "@/styles/index.css";
import "react-quill/dist/quill.snow.css";
import { ErrorBoundary, ThemeProvider } from "@/shared/components";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme" attribute="class">
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </ErrorBoundary>
);
