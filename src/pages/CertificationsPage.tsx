import { CertificationSection } from "@/components/sections/CertificationSection";
import Layout from "@/components/Layout";

const CertificationsPage = () => {
  return (
    <Layout title="Certifications">
      <div className="max-w-4xl mx-auto">
        <CertificationSection />
      </div>
    </Layout>
  );
};

export default CertificationsPage;