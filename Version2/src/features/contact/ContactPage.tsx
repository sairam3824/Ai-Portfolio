import { ContactSection } from "./ContactSection";
import Seo from "../../shared/Seo";

const ContactPage = () => {
    return (
        <div className="w-full min-h-full">
            <Seo
                title="Contact | Sai Ram Maruri"
                description="Get in touch with Sai Ram Maruri for collaborations, opportunities, or technical inquiries."
            />
            <ContactSection />
        </div>
    );
};

export default ContactPage;
