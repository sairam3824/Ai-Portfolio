import { SkillsSection } from "./SkillsSection";
import Layout from "@/shared/components/Layout";

const SkillsPage = () => {
  return (
    <Layout title="Skills">
      <div className="max-w-4xl mx-auto">
        <SkillsSection />
      </div>
    </Layout>
  );
};

export default SkillsPage;