import { CertificationSection } from "./CertificationSection";
import Layout from "@/shared/components/Layout";
import { profileDetails } from "@/data/siteMetadata";

const CertificationsPage = () => {
  return (
    <Layout
      description={`Professional certifications in AI, cloud computing, and data science earned by ${profileDetails.name}.`}
      canonicalPath="/certifications"
      pageType="CollectionPage"
      keywords={[`${profileDetails.name} Certifications`, "AI Certifications", "Cloud Certifications", "Data Science Certifications"]}
    >
      <div className="max-w-4xl mx-auto">
        <CertificationSection />
      </div>
    </Layout>
  );
};

export default CertificationsPage;
