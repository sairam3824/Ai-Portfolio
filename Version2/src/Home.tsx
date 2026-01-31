import { Helmet } from "react-helmet-async";
import HeroCard from "./features/home/HeroCard";
import AvatarCard from "./features/home/AvatarCard";
import ProjectsPreview from "./features/home/ProjectsPreview";
import SkillsPreview from "./features/home/SkillsPreview";
import CodingPreview from "./features/home/CodingPreview";
import CertsPreview from "./features/home/CertsPreview";
import BlogPreview from "./features/home/BlogPreview";
import VibeCoderCard from "./features/home/VibeCoderCard";
import ResearchPreview from "./features/home/ResearchPreview";
import AchievementsPreview from "./features/home/AchievementsPreview";
import GoalsCard from "./features/home/GoalsCard";
import ContactCTA from "./features/home/ContactCTA";

const Home = () => {
    return (
        <div className="relative min-h-full w-full py-6 md:py-10 px-2 sm:px-4">
            <Helmet>
                <title>Sai Ram Maruri | GenAI Pioneer & Full Stack Engineer</title>
                <meta
                    name="description"
                    content="Portfolio of Sai Ram Maruri - GenAI Pioneer specializing in autonomous systems, LLM agents, and full-stack engineering. Transforming complexity into intelligent solutions."
                />
            </Helmet>

            {/* Ambient Background Glows — hidden on mobile for GPU perf */}
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

            {/* Bento Grid */}
            <div className="grid grid-cols-12 gap-4 md:gap-5 max-w-7xl mx-auto">
                {/* ROW 1-2: Hero + Avatar */}
                <HeroCard />
                <AvatarCard />

                {/* ROW 3-4: Projects + Vibe Coder + Coding DNA */}
                <ProjectsPreview />
                <VibeCoderCard />
                <CodingPreview />

                {/* ROW 5: Skills */}
                <SkillsPreview />
                <div className="col-span-12 md:col-span-3 flex flex-col gap-4 md:gap-5">
                    <ResearchPreview />
                    <AchievementsPreview />
                </div>

                {/* ROW 6: Certs + Goals (Left) | Blog + Contact (Right) */}
                <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-5 h-full">
                    <CertsPreview />
                    <GoalsCard className="flex-1" />
                </div>

                <div className="col-span-12 md:col-span-7 flex flex-col gap-4 md:gap-5 h-full">
                    <BlogPreview />
                    <ContactCTA />
                </div>
            </div>
        </div>
    );
};

export default Home;
