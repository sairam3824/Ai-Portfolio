import { ProjectsSection } from "./ProjectsSection";
import Seo from "../../shared/Seo";

const ProjectsPage = () => {
    return (
        <div className="h-full">
            <Seo
                title="Projects | Sai Ram Maruri — AI & Full Stack"
                description="30+ production AI, ML, and Full Stack projects by Sai Ram Maruri. Includes RAG systems (Orravyn), EdTech SaaS (VidyAI), AI job matching (HireMind), traffic prediction, system design simulator, and cloud-native apps on AWS."
                pageType="CollectionPage"
                keywords={["AI Projects", "GenAI Projects", "RAG System", "LLM Projects", "Full Stack Projects", "Orravyn", "VidyAI", "HireMind", "AWS AI Projects", "Sai Ram Maruri Projects", "SaaS AI"]}
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: "Projects", url: "/projects" },
                ]}
            />
            <ProjectsSection />
        </div>
    );
};

export default ProjectsPage;
