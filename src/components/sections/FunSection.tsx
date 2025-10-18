import { Award } from "lucide-react";

const certifications = [
  {
    title: "Oracle Generative AI Professional",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=CC2371A772A07EC0926BE492904B67F3AA59912C48FE5488BAB54F87F914D350",
  },
  {
    title: "AWS Cloud Practitioner",
    link: "https://www.credly.com/badges/eeb97be1-16e8-475b-8f08-d3ffdf051f2e/linked_in_profile",
  },
  {
    title: "Azure Data Fundamentals",
    link: "https://www.credly.com/badges/3babc93b-cca9-4bde-be5a-0d55b0fcccfc/linked_in_profile",
  },
  {
    title: "Machine Learning with Python (V2) - IBM",
    link: "https://www.credly.com/badges/cd2b7f2d-9801-4b86-b8a0-11e524fda1bb/linked_in_profile",
  },
  {
    title: "AWS Educate ML Foundations",
    link: "https://www.credly.com/badges/ad0fb6d2-6602-4379-acde-8b22ed8f0480/linked_in_profile",
  },
  {
    title: "AWS Academy Cloud Foundations",
    link: "https://www.credly.com/badges/d73abe58-f04a-4288-9c30-bfbe53de87a7/linked_in_profile",
  },
  {
    title: "AWS Academy Cloud Architecting",
    link: "https://www.credly.com/badges/888243cf-190f-4e26-b059-a5a8c3842b27/linked_in_profile",
  },
  {
    title: "Data Science & Machine Learning - Coding Ninjas",
    link: "https://certificate.codingninjas.com/view/2833c71dc5a91a43",
  },
  {
    title: "Introduction to Databases - Meta (Coursera)",
    link: "https://www.coursera.org/account/accomplishments/verify/VRH7E3DRZ5DN",
  },
];

export const FunSection = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <h2 className="text-3xl font-bold text-foreground">Certifications</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-card border-2 border-border hover:border-accent transition-all duration-300 hover:scale-[1.03] shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-6 h-6 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">{cert.title}</h3>
            </div>

            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              View Certificate →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
