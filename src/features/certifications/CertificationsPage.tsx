import { CertificationSection } from "./CertificationSection";
import Layout from "@/shared/components/Layout";

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