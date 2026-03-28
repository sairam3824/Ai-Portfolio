import { memo } from "react";
import { Award, ArrowUpRight } from "lucide-react";
import { certifications } from "@/data/certificationsData";

const CertificationItem = memo(({ cert }: { cert: { title: string; link: string } }) => (
  <li
    className="group flex items-center justify-between bg-white/10 dark:bg-white/5 
               backdrop-blur-md border border-white/20 rounded-xl 
               px-6 py-4 transition-all duration-300 
               hover:bg-white/20 hover:border-accent/40 hover:scale-[1.02]
               shadow-sm"
    style={{ contentVisibility: 'auto' }}
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
));

CertificationItem.displayName = 'CertificationItem';

export const CertificationSection = () => {
  return (
    <section
      id="certifications"
      className="animate-fade-in space-y-10 scroll-mt-28"
    >
      <h2 className="text-4xl font-bold text-foreground text-center select-none pointer-events-none focus:outline-none">
        Certifications
      </h2>

      <ul className="max-w-4xl mx-auto space-y-5 px-4">
        {certifications.map((cert, index) => (
          <CertificationItem key={index} cert={cert} />
        ))}
      </ul>
    </section>
  );
};

export default CertificationSection;
