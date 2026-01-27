import { Helmet } from "react-helmet-async";
import { CertificationSection } from "./CertificationSection";
import Layout from "@/shared/components/Layout";

const CertificationsPage = () => {
  return (
    <>
      <Helmet>
        <title>Certifications - Sairam Maruri</title>
        <meta name="description" content="Professional certifications in AI, Cloud Computing, and Data Science by Sairam Maruri" />
        <link rel="canonical" href="https://saiii.in/certifications" />
      </Helmet>
      <Layout title="Certifications">
        <div className="max-w-4xl mx-auto">
          <CertificationSection />
        </div>
      </Layout>
    </>
  );
};

export default CertificationsPage;