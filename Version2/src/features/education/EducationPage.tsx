import { EducationSection } from "./EducationSection";
import Seo from "../../shared/Seo";

const EducationPage = () => {
    return (
        <div className="max-w-7xl mx-auto pb-10 pt-0 px-6">
            <Seo
                title="Education | Sai Ram Maruri"
                description="Academic background and educational journey of Sai Ram Maruri — Computer Science and Engineering at VIT."
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
