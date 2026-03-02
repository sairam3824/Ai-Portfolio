import { SkillsSection } from "./SkillsSection";
import Seo from "../../shared/Seo";

const SkillsPage = () => {
    return (
        <div className="max-w-7xl mx-auto pb-8 pt-0 px-4">
            <Seo
                title="Skills | Sai Ram Maruri — GenAI, Cloud & Full Stack"
                description="Technical skills of Sai Ram Maruri: 75+ skills across GenAI (LangChain, RAG, Vector DB, OpenAI, Claude, LangGraph), Cloud (AWS Bedrock, SageMaker, Lambda), Full Stack (React, TypeScript, FastAPI, Go, Next.js), and competitive programming."
                keywords={["GenAI Skills", "LangChain", "RAG", "AWS Bedrock", "React", "TypeScript", "Python", "LLM Skills", "Cloud Engineer", "FastAPI", "Vector Database", "AI Engineer Skills"]}
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: "Skills", url: "/skills" },
                ]}
            />
            <SkillsSection />
        </div>
    );
};

export default SkillsPage;
