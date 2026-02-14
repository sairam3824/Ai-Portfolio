import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../../shared/Seo";

const PrivacyPage = () => {
  return (
    <div className="home-container relative min-h-full py-12 px-4 md:px-8 max-w-5xl mx-auto">
      <Seo
        title="Privacy Policy | Sai Ram Maruri"
        description="Privacy policy for Sai Ram Maruri's portfolio website."
      />
      <div className="mb-12">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight">Privacy Policy</h1>
        <p className="text-gray-500 font-medium">Last updated: January 2026</p>
      </div>

      <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
        <section className="mb-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold mb-6 group transition-all">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h2 className="text-2xl font-semibold mb-3 text-gray-800 border-b border-gray-200 pb-2">Introduction</h2>
          <p className="mb-4">
            This Privacy Policy explains how Sai Rama Linga Reddy Maruri ("I", "me", or "my") collects,
            uses, discloses, and safeguards personal information when you visit or interact with my
            personal portfolio website (the "Website").
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Information I Collect</h2>
          <h3 className="text-xl font-medium mb-3 text-gray-800">Information You Provide</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Contact details you provide through forms or direct messages</li>
            <li>Content of inquiries or requests submitted via chat or email</li>
            <li>Any other information you voluntarily share while engaging with me</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 text-gray-800">Automatically Collected Information</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Anonymized IP address or general location data</li>
            <li>Pages viewed, time spent, and referring URLs</li>
            <li>Device identifiers or other diagnostic data</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">How I Use Your Information</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To respond to your inquiries and communications</li>
            <li>To improve the Website's functionality, performance, and accessibility</li>
            <li>To analyze engagement trends and diagnose technical issues</li>
            <li>To prevent fraud, abuse, or security incidents</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Information Sharing</h2>
          <p className="mb-4">
            I do not sell, rent, or trade your personal information. I may disclose limited information
            only in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>With your explicit consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect my rights, property, or safety, or the rights of others</li>
            <li>To service providers who assist with Website hosting or analytics, subject to
              confidentiality obligations</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Data Security</h2>
          <p className="mb-4">
            I implement commercially reasonable technical and organizational safeguards to help protect
            your personal information against unauthorized access, alteration, disclosure, or
            destruction. Nevertheless, no method of transmission or storage is completely secure, and
            I cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Cookies and Tracking</h2>
          <p className="mb-4">
            The Website may use cookies, analytics scripts, or similar tracking technologies to enhance
            your browsing experience and understand how visitors use the site. You can adjust your
            browser or device settings to refuse cookies or notify you when cookies are being used; doing
            so may affect certain features.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Request access to the personal information I hold about you</li>
            <li>Request correction of inaccurate or incomplete information</li>
            <li>Request deletion of your personal information, subject to legal obligations</li>
            <li>Object to or restrict certain processing activities</li>
            <li>Withdraw consent where processing is based on consent</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, please contact me using the information provided below. I may need
            to verify your identity before fulfilling the request.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Changes to This Policy</h2>
          <p className="mb-4">
            I may update this Privacy Policy periodically to reflect changes in practices, technologies,
            or legal requirements. Any updates will be posted on this page with an updated revision date,
            and material changes will be highlighted where appropriate.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Third-Party Services</h2>
          <p className="mb-4">
            The Website may integrate with third-party services (such as analytics providers, hosting
            services, or content delivery networks) that have their own privacy policies. I encourage
            you to review the privacy policies of any third-party services that may collect your
            information.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Data Retention</h2>
          <p className="mb-4">
            I retain personal information only for as long as necessary to fulfill the purposes outlined
            in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce
            agreements. When personal information is no longer needed, it will be securely deleted or
            anonymized.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">International Data Transfers</h2>
          <p className="mb-4">
            Your information may be transferred to and processed in countries other than your country of
            residence. These countries may have different data protection laws. By using the Website,
            you consent to such transfers, and I will take appropriate measures to ensure your
            information receives adequate protection.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2 text-center mt-12">Contact Information</h2>
          <p className="mb-4 text-center">
            If you have questions or requests regarding this Privacy Policy, please contact me using the
            Website's contact form or via the email address listed there. I will respond within a
            reasonable timeframe.
          </p>
          <p className="text-sm text-gray-500 text-center mt-8 border-t border-gray-200 pt-6">
            This Privacy Policy constitutes a legally binding agreement between you and Sai Rama Linga Reddy Maruri.
            By continuing to use this Website, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
