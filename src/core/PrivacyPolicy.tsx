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
              This Privacy Policy describes how Sai Rama Linga Reddy Maruri ("I", "me", or "my") collects, 
              uses, and protects your information when you visit my personal portfolio website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information I Collect</h2>
            <h3 className="text-xl font-medium mb-2">Information You Provide</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Contact information when you reach out through the contact form</li>
              <li>Messages or inquiries you send through the chat feature</li>
              <li>Any other information you voluntarily provide</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-2">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address (anonymized)</li>
              <li>Pages visited and time spent on the site</li>
              <li>Referring website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How I Use Your Information</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>To respond to your inquiries and communications</li>
              <li>To improve the website's functionality and user experience</li>
              <li>To analyze website usage and performance</li>
              <li>To prevent fraud and ensure website security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
            <p className="mb-4">
              I do not sell, trade, or otherwise transfer your personal information to third parties. 
              Information may only be shared in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect my rights, property, or safety</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="mb-4">
              I implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
            <p className="mb-4">
              This website may use cookies and similar tracking technologies to enhance your browsing 
              experience. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access the personal information I have about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to the processing of your personal information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="mb-4">
              I may update this Privacy Policy from time to time. Any changes will be posted on this 
              page with an updated revision date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact me through the 
              contact form on my website or via email.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;