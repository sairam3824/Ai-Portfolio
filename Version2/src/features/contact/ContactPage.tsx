import { ContactSection } from "./ContactSection";
import Seo from "../../shared/Seo";

const ContactPage = () => {
    return (
        <div className="w-full min-h-full">
            <Seo
                title="Contact | Sai Ram Maruri — Hire a GenAI Engineer"
                description="Contact Sai Ram Maruri for GenAI engineering collaborations, job opportunities, project inquiries, or technical discussions. Based in Amaravati, India. Available for remote and onsite roles."
                pageType="ContactPage"
                keywords={["Hire GenAI Engineer", "Contact Sai Ram Maruri", "AI Engineer India", "Freelance AI Developer", "GenAI Consultant", "ML Engineer Hire", "AI SaaS Developer"]}
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: "Contact", url: "/contact" },
                ]}
            />
            <ContactSection />
        </div>
    );
};

export default ContactPage;
