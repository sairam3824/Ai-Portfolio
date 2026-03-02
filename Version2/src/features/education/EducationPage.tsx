import { EducationSection } from "./EducationSection";
import Seo from "../../shared/Seo";

const EducationPage = () => {
    return (
        <div className="max-w-7xl mx-auto pb-10 pt-0 px-6">
            <Seo
                title="Education | Sai Ram Maruri — B.Tech CS VIT-AP"
                description="Academic background of Sai Ram Maruri: B.Tech Computer Science at VIT-AP (CGPA 8.31, 2022–2026), intermediate and secondary at Sri Chaitanya. Strong foundation in algorithms, system design, AI, and competitive programming."
                keywords={["VIT-AP", "B.Tech Computer Science", "Sai Ram Maruri Education", "CSE Student India", "VIT Amaravati", "Computer Science Engineering"]}
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: "Education", url: "/education" },
                ]}
            />
            <EducationSection />
        </div>
    );
};

export default EducationPage;
