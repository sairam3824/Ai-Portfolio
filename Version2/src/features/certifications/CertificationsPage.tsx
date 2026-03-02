import { CertificationSection } from "./CertificationSection";
import Seo from "../../shared/Seo";

const CertificationsPage = () => {
    return (
        <div className="max-w-7xl mx-auto pb-8 pt-0 px-4">
            <Seo
                title="Certifications | Sai Ram Maruri — Cloud & AI"
                description="12 professional certifications by Sai Ram Maruri: AWS Certified Cloud Practitioner, Oracle Generative AI Professional, Oracle AI Vector Search, IBM RAG, Microsoft Azure, and more across cloud, AI, and software engineering."
                keywords={["AWS Certification", "Oracle GenAI Certification", "Oracle AI Vector Search", "IBM RAG Certification", "Azure Certification", "AI Certifications India", "Cloud Certifications", "Sai Ram Maruri Certifications"]}
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: "Certifications", url: "/certifications" },
                ]}
            />
            <CertificationSection />
        </div>
    );
};

export default CertificationsPage;
