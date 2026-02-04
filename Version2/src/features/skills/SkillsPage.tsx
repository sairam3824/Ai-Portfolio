import { SkillsSection } from "./SkillsSection";
import Seo from "../../shared/Seo";

const SkillsPage = () => {
    return (
        <div className="max-w-7xl mx-auto pb-8 pt-0 px-4">
            <Seo
                title="Skills | Sai Ram Maruri"
                description="Technical skills matrix of Sai Ram Maruri — covering GenAI, Full Stack, Cloud, and Software Engineering."
            />
            <SkillsSection />
        </div>
    );
};

export default SkillsPage;
