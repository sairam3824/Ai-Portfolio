import { useEffect } from "react";
import Layout from "@/components/Layout";

const ResumePage = () => {
  useEffect(() => {
    // Redirect to PDF resume
    window.location.href = "/Sai_Ram_Maruri_Resume_2025.pdf";
  }, []);

  return (
    <Layout title="Resume">
      <div className="flex items-center justify-center min-h-[60vh] max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Redirecting to Resume...</h1>
          <p className="text-muted-foreground">
            If the download doesn't start automatically, 
            <a 
              href="/Sai_Ram_Maruri_Resume_2025.pdf" 
              className="text-accent hover:underline ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              click here
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ResumePage;