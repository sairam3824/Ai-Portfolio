import { CertificationSection } from "./CertificationSection";
import Seo from "../../shared/Seo";

const CertificationsPage = () => {
    return (
        <div className="max-w-7xl mx-auto pb-8 pt-0 px-4">
            <Seo
                title="Certifications | Sai Ram Maruri"
                description="Professional certifications and credentials earned by Sai Ram Maruri in Cloud, AI, and Software Development."
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
