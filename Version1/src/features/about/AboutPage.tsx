import { AboutSection } from "./AboutSection";
import Layout from "@/shared/components/Layout";

const AboutPage = () => {
  return (
    <Layout title="About Me">
      <div className="max-w-4xl mx-auto">
        <AboutSection />
      </div>
    </Layout>
  );
};

export default AboutPage;