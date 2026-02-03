import { Helmet } from "react-helmet-async";
import { SkillsSection } from "./SkillsSection";

const SkillsPage = () => {
    return (
        <div className="max-w-7xl mx-auto pb-8 pt-0 px-4">
            <Helmet>
                <title>Skills | Sai Ram Maruri</title>
                <meta name="description" content="Technical skills matrix of Sai Ram Maruri — covering GenAI, Full Stack, Cloud, and Software Engineering." />
            </Helmet>
            <SkillsSection />
        </div>
    );
};

export default SkillsPage;
