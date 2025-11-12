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
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="mb-4">
              Welcome to the personal portfolio website of Sai Rama Linga Reddy Maruri. These Terms and 
              Conditions ("Terms") govern your use of this website and any related services provided.
            </p>
            <p className="mb-4">
              By accessing or using this website, you agree to be bound by these Terms. If you do not 
              agree with any part of these Terms, you may not use this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Use of the Website</h2>
            <h3 className="text-xl font-medium mb-2">Permitted Use</h3>
            <p className="mb-4">You may use this website for:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Viewing my portfolio and professional information</li>
              <li>Contacting me for legitimate business or professional purposes</li>
              <li>Downloading my resume for professional evaluation</li>
              <li>Learning about my skills, projects, and experience</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">Prohibited Use</h3>
            <p className="mb-4">You may not:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>Scrape, copy, or reproduce content without permission</li>
              <li>Use the website to spam or send unsolicited communications</li>
              <li>Impersonate me or misrepresent your relationship with me</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including but not limited to text, images, graphics, logos, 
              and code, is my intellectual property or used with permission. You may not reproduce, 
              distribute, or create derivative works without explicit written consent.
            </p>
            <p className="mb-4">
              My resume and portfolio content may be viewed and downloaded for professional evaluation 
              purposes only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User-Generated Content</h2>
            <p className="mb-4">
              When you contact me through forms or chat features, you grant me the right to use your 
              communications for the purpose of responding to your inquiries and improving my services.
            </p>
            <p className="mb-4">
              You are responsible for ensuring that any content you submit does not violate any laws 
              or third-party rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Disclaimers</h2>
            <h3 className="text-xl font-medium mb-2">Website Availability</h3>
            <p className="mb-4">
              While I strive to maintain website availability, I cannot guarantee uninterrupted access. 
              The website may be temporarily unavailable due to maintenance, updates, or technical issues.
            </p>

            <h3 className="text-xl font-medium mb-2">Information Accuracy</h3>
            <p className="mb-4">
              I make every effort to ensure the accuracy of information on this website, but I cannot 
              guarantee that all information is current, complete, or error-free.
            </p>

            <h3 className="text-xl font-medium mb-2">External Links</h3>
            <p className="mb-4">
              This website may contain links to external websites. I am not responsible for the content, 
              privacy practices, or terms of service of external sites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              To the fullest extent permitted by law, I shall not be liable for any direct, indirect, 
              incidental, special, or consequential damages arising from your use of this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Privacy</h2>
            <p className="mb-4">
              Your privacy is important to me. Please review my Privacy Policy to understand how I 
              collect, use, and protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Professional Services</h2>
            <p className="mb-4">
              This website serves as a portfolio and does not constitute an offer for employment or 
              services. Any professional arrangements must be agreed upon separately in writing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Modifications</h2>
            <p className="mb-4">
              I reserve the right to modify these Terms at any time. Changes will be effective 
              immediately upon posting. Your continued use of the website constitutes acceptance 
              of the modified Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p className="mb-4">
              These Terms are governed by and construed in accordance with applicable laws. Any 
              disputes shall be resolved through appropriate legal channels.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms and Conditions, please contact me through 
              the contact form on my website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;