import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/button";

const PrivacyPolicy = () => {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="mb-4">
              This Privacy Policy explains how Sai Rama Linga Reddy Maruri ("I", "me", or "my") collects,
              uses, discloses, and safeguards personal information when you visit or interact with my
              personal portfolio website (the "Website").
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information I Collect</h2>
            <h3 className="text-xl font-medium mb-2">Information You Provide</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Contact details you provide through forms or direct messages</li>
              <li>Content of inquiries or requests submitted via chat or email</li>
              <li>Any other information you voluntarily share while engaging with me</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-2">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Anonymized IP address or general location data</li>
              <li>Pages viewed, time spent, and referring URLs</li>
              <li>Device identifiers or other diagnostic data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How I Use Your Information</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>To respond to your inquiries and communications</li>
              <li>To improve the Website's functionality, performance, and accessibility</li>
              <li>To analyze engagement trends and diagnose technical issues</li>
              <li>To prevent fraud, abuse, or security incidents</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
            <p className="mb-4">
              I do not sell, rent, or trade your personal information. I may disclose limited information
              only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect my rights, property, or safety, or the rights of others</li>
              <li>To service providers who assist with Website hosting or analytics, subject to
                confidentiality obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="mb-4">
              I implement commercially reasonable technical and organizational safeguards to help protect
              your personal information against unauthorized access, alteration, disclosure, or
              destruction. Nevertheless, no method of transmission or storage is completely secure, and
              I cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
            <p className="mb-4">
              The Website may use cookies, analytics scripts, or similar tracking technologies to enhance
              your browsing experience and understand how visitors use the site. You can adjust your
              browser or device settings to refuse cookies or notify you when cookies are being used; doing
              so may affect certain features.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
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

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="mb-4">
              I may update this Privacy Policy periodically to reflect changes in practices, technologies,
              or legal requirements. Any updates will be posted on this page with an updated revision date,
              and material changes will be highlighted where appropriate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have questions or requests regarding this Privacy Policy, please contact me using the
              Website's contact form or via the email address listed there. I will respond within a
              reasonable timeframe.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;