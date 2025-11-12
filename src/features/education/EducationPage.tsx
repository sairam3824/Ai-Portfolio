import { EducationSection } from "./EducationSection";
import Layout from "@/shared/components/Layout";

const EducationPage = () => {
  return (
    <Layout title="Education">
      <div className="max-w-4xl mx-auto">
        <EducationSection />
      </div>
    </Layout>
  );
};

export default EducationPage;