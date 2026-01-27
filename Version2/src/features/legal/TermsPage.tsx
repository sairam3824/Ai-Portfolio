import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsPage = () => {
  return (
    <div className="home-container relative min-h-full py-12 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Terms and Conditions</h1>
        <p className="text-gray-500 font-medium">Last updated: January 2026</p>
      </div>

      <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
        <section className="mb-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold mb-6 group transition-all">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900 border-b border-gray-200 pb-2">Introduction</h2>
          <p className="mb-4">
            Welcome to the personal portfolio website of Sai Rama Linga Reddy Maruri (the "Website").
            These Terms and Conditions ("Terms") govern your access to and use of the Website and any
            related content or services made available through it.
          </p>
          <p className="mb-4">
            By accessing or using the Website, you acknowledge that you have read, understood, and agree
            to be bound by these Terms. If you do not agree, you must refrain from using the Website.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Use of the Website</h2>
          <h3 className="text-xl font-medium mb-3 text-gray-800">Permitted Use</h3>
          <p className="mb-4">You may use this website for:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Reviewing my portfolio, projects, and professional experience</li>
            <li>Contacting me for legitimate business, collaboration, or employment opportunities</li>
            <li>Downloading my resume solely for professional evaluation</li>
            <li>Learning more about my skills, services, and accomplishments</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 text-gray-800">Prohibited Use</h3>
          <p className="mb-4">You may not:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Use the website for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to any part of the website</li>
            <li>Transmit malware, malicious code, or engage in disruptive activities</li>
            <li>Scrape, copy, or reproduce content without explicit permission</li>
            <li>Use the website to send unsolicited or fraudulent communications</li>
            <li>Impersonate me or misrepresent your relationship with me</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Intellectual Property</h2>
          <p className="mb-4">
            All content on the Website—including text, graphics, logos, photographs, videos, designs,
            and code—is owned by me or used with permission from the respective owners. You may not
            reproduce, distribute, modify, or create derivative works from the content without my prior
            written consent.
          </p>
          <p className="mb-4">
            You may view or download my resume and portfolio materials strictly for professional
            evaluation and not for commercial resale or redistribution.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">User-Generated Content</h2>
          <p className="mb-4">
            When you submit information through contact forms, email, or chat features, you grant me a
            non-exclusive right to use that information for the sole purpose of responding to your
            inquiry and improving the Website and related services.
          </p>
          <p className="mb-4">
            You are solely responsible for ensuring that the information you provide is accurate,
            lawful, and does not infringe on any third-party rights.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Disclaimers</h2>
          <h3 className="text-xl font-medium mb-3 text-gray-800">Website Availability</h3>
          <p className="mb-4">
            I strive to keep the Website available at all times but do not guarantee uninterrupted or
            error-free operation. Downtime may occur due to maintenance, updates, or unforeseen
            technical issues.
          </p>

          <h3 className="text-xl font-medium mb-3 text-gray-800">Information Accuracy</h3>
          <p className="mb-4">
            While I make reasonable efforts to keep the content accurate and up to date, information on
            the Website may occasionally be incomplete, outdated, or contain errors. I make no
            warranties regarding the accuracy, reliability, or completeness of the content.
          </p>

          <h3 className="text-xl font-medium mb-3 text-gray-800">External Links</h3>
          <p className="mb-4">
            The Website may include links to third-party websites for convenience. I do not endorse, and
            am not responsible for, the content, privacy practices, or terms of those external sites.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Limitation of Liability</h2>
          <p className="mb-4">
            To the fullest extent permitted by law, I shall not be liable for any direct, indirect,
            incidental, special, consequential, or punitive damages arising from your use of—or inability
            to use—the Website, even if I have been advised of the possibility of such damages.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Privacy</h2>
          <p className="mb-4">
            Your privacy is important to me. Please refer to my Privacy Policy to understand how your
            personal information is collected, used, and protected.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Modifications to Terms</h2>
          <p className="mb-4">
            I reserve the right to modify these Terms at any time. Changes will be posted on this page
            with an updated revision date. Material changes will be highlighted where appropriate.
            Continued use of the Website after changes are posted constitutes acceptance of the revised
            Terms.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Termination</h2>
          <p className="mb-4">
            I may terminate or suspend your access to the Website at any time, without prior notice,
            for conduct that I believe violates these Terms or is harmful to other users, me, or third
            parties, or for any other reason at my sole discretion.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed by and construed in accordance with the laws of the
            jurisdiction where I reside, without regard to conflict of law principles. Any disputes
            arising under these Terms shall be subject to the exclusive jurisdiction of the courts in
            that jurisdiction.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Severability</h2>
          <p className="mb-4">
            If any provision of these Terms is found to be unenforceable or invalid, that provision
            shall be limited or eliminated to the minimum extent necessary so that these Terms shall
            otherwise remain in full force and effect and enforceable.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2 text-center mt-12">Contact Information</h2>
          <p className="mb-4 text-center">
            If you have questions about these Terms and Conditions, please reach out via the contact form
            on the Website or by email at the address provided there.
          </p>
          <p className="text-sm text-gray-500 text-center mt-8 border-t border-gray-200 pt-6">
            These Terms and Conditions constitute a legally binding agreement between you and Sai Rama Linga Reddy Maruri.
            By using this Website, you acknowledge that you have read, understood, and agree to be bound by these Terms.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;