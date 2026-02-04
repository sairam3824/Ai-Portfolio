import { ProjectsSection } from "./ProjectsSection";
import Seo from "../../shared/Seo";

const ProjectsPage = () => {
    return (
        <div className="h-full">
            <Seo
                title="Projects | Sai Ram Maruri"
                description="Explore a collection of GenAI, Full Stack, and Machine Learning projects by Sai Ram Maruri."
            />
            <ProjectsSection />
        </div>
    );
};

export default ProjectsPage;
