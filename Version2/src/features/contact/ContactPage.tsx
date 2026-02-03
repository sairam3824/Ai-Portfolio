import { Helmet } from "react-helmet-async";
import { ContactSection } from "./ContactSection";

const ContactPage = () => {
    return (
        <div className="w-full min-h-full">
            <Helmet>
                <title>Contact | Sai Ram Maruri</title>
                <meta name="description" content="Get in touch with Sai Ram Maruri for collaborations, opportunities, or technical inquiries." />
            </Helmet>
            <ContactSection />
        </div>
    );
};

export default ContactPage;
