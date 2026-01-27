import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/button";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Terms and Conditions</h1>
          <p className="text-muted-foreground">Last updated: January 2026</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
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

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Use of the Website</h2>
            <h3 className="text-xl font-medium mb-2">Permitted Use</h3>
            <p className="mb-4">You may use this website for:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Reviewing my portfolio, projects, and professional experience</li>
              <li>Contacting me for legitimate business, collaboration, or employment opportunities</li>
              <li>Downloading my resume solely for professional evaluation</li>
              <li>Learning more about my skills, services, and accomplishments</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">Prohibited Use</h3>
            <p className="mb-4">You may not:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Transmit malware, malicious code, or engage in disruptive activities</li>
              <li>Scrape, copy, or reproduce content without explicit permission</li>
              <li>Use the website to send unsolicited or fraudulent communications</li>
              <li>Impersonate me or misrepresent your relationship with me</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
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

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User-Generated Content</h2>
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

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Disclaimers</h2>
            <h3 className="text-xl font-medium mb-2">Website Availability</h3>
            <p className="mb-4">
              I strive to keep the Website available at all times but do not guarantee uninterrupted or
              error-free operation. Downtime may occur due to maintenance, updates, or unforeseen
              technical issues.
            </p>

            <h3 className="text-xl font-medium mb-2">Information Accuracy</h3>
            <p className="mb-4">
              While I make reasonable efforts to keep the content accurate and up to date, information on
              the Website may occasionally be incomplete, outdated, or contain errors. I make no
              warranties regarding the accuracy, reliability, or completeness of the content.
            </p>

            <h3 className="text-xl font-medium mb-2">External Links</h3>
            <p className="mb-4">
              The Website may include links to third-party websites for convenience. I do not endorse, and
              am not responsible for, the content, privacy practices, or terms of those external sites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              To the fullest extent permitted by law, I shall not be liable for any direct, indirect,
              incidental, special, consequential, or punitive damages arising from your use of—or inability
              to use—the Website, even if I have been advised of the possibility of such damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Privacy</h2>
            <p className="mb-4">
              Your privacy is important to me. Please refer to my Privacy Policy to understand how your
              personal information is collected, used, and protected.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Professional Services</h2>
            <p className="mb-4">
              The Website is informational and does not constitute a binding offer of employment,
              freelance services, or consulting engagements. Any professional arrangement must be agreed
              to separately in writing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Modifications</h2>
            <p className="mb-4">
              I reserve the right to modify or update these Terms at any time. Changes take effect
              immediately upon posting. Your continued use of the Website after modifications are posted
              constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p className="mb-4">
              These Terms are governed by and construed in accordance with the applicable laws of the
              jurisdiction in which I reside, without regard to conflict-of-law principles. Any disputes
              shall be handled through the appropriate legal channels in that jurisdiction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have questions about these Terms and Conditions, please reach out via the contact form
              on the Website or by email at the address provided there.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;