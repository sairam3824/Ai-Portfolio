import { SkillsSection } from "@/components/sections/SkillsSection";
import Layout from "@/components/Layout";

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