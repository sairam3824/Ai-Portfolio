import { Helmet } from "react-helmet-async";
import { EducationSection } from "./EducationSection";

const EducationPage = () => {
    return (
        <div className="max-w-7xl mx-auto pb-10 pt-0 px-6">
            <Helmet>
                <title>Education | Sai Ram Maruri</title>
                <meta name="description" content="Academic background and educational journey of Sai Ram Maruri — Computer Science and Engineering at VIT." />
            </Helmet>
            <EducationSection />
        </div>
    );
};

export default EducationPage;
