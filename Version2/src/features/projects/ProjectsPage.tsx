import { Helmet } from "react-helmet-async";
import { ProjectsSection } from "./ProjectsSection";

const ProjectsPage = () => {
    return (
        <div className="h-full">
            <Helmet>
                <title>Projects | Sai Ram Maruri</title>
                <meta name="description" content="Explore a collection of GenAI, Full Stack, and Machine Learning projects by Sai Ram Maruri." />
            </Helmet>
            <ProjectsSection />
        </div>
    );
};

export default ProjectsPage;
