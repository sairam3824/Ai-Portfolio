import { Award, ArrowUpRight } from "lucide-react";

const certifications = [
  {
    title: "IBM RAG and Agentic AI Professional Certificate",
    link: "https://www.credly.com/badges/84dabd2f-4c54-4ad8-b424-8ff9ab85d263/public_url",
  },
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
    <section
      id="certifications"
      className="animate-fade-in space-y-10 scroll-mt-28"
    >
      <h2 className="text-4xl font-bold text-foreground text-center select-none pointer-events-none">
        Certifications
      </h2>

      <ul className="max-w-4xl mx-auto space-y-5 px-4">
        {certifications.map((cert, index) => (
          <li
            key={index}
            className="group flex items-center justify-between bg-white/10 dark:bg-white/5 
                       backdrop-blur-md border border-white/20 rounded-xl 
                       px-6 py-4 transition-all duration-300 
                       hover:bg-white/20 hover:border-accent/40 hover:scale-[1.02]
                       shadow-sm"
          >
            <div className="flex items-center gap-4">
              <Award className="w-6 h-6 text-accent shrink-0" />
              <span className="text-base md:text-lg font-semibold text-foreground/90">
                {cert.title}
              </span>
            </div>

            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm md:text-base text-accent font-medium 
                         opacity-90 hover:opacity-100 transition-opacity"
            >
              View <ArrowUpRight className="w-4 h-4" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FunSection;
