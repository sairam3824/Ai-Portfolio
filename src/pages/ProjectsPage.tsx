import { ProjectsSection } from "@/components/sections/ProjectsSection";
import Layout from "@/components/Layout";

const ProjectsPage = () => {
  return (
    <Layout title="Projects">
      <div className="max-w-4xl mx-auto">
        <ProjectsSection />
      </div>
    </Layout>
  );
};

export default ProjectsPage;