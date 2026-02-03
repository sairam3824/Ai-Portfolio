import { Helmet } from "react-helmet-async";
import { CertificationSection } from "./CertificationSection";

const CertificationsPage = () => {
    return (
        <div className="max-w-7xl mx-auto pb-8 pt-0 px-4">
            <Helmet>
                <title>Certifications | Sai Ram Maruri</title>
                <meta name="description" content="Professional certifications and credentials earned by Sai Ram Maruri in Cloud, AI, and Software Development." />
            </Helmet>
            <CertificationSection />
        </div>
    );
};

export default CertificationsPage;
