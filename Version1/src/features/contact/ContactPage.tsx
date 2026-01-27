import { ContactSection } from "./ContactSection";
import Layout from "@/shared/components/Layout";

const ContactPage = () => {
  return (
    <Layout title="Contact">
      <div className="max-w-4xl mx-auto">
        <ContactSection />
      </div>
    </Layout>
  );
};

export default ContactPage;