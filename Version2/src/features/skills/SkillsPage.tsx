import { SkillsSection } from "./SkillsSection";
import Seo from "../../shared/Seo";

const SkillsPage = () => {
    return (
        <div className="max-w-7xl mx-auto pb-8 pt-0 px-4">
            <Seo
                title="Skills | Sai Ram Maruri"
                description="Technical skills matrix of Sai Ram Maruri — covering GenAI, Full Stack, Cloud, and Software Engineering."
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
