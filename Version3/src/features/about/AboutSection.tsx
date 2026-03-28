import { AboutBio } from "./components/AboutBio";
import { CodingProfiles } from "./components/CodingProfiles";
import { SocialLinks } from "./components/SocialLinks";

export const AboutSection = () => {
  return (
    <section id="about" className="scroll-mt-28 animate-fade-in space-y-6">
      <h2 className="text-3xl font-bold text-foreground text-center select-none pointer-events-none focus:outline-none">
        About Me
      </h2>

      <AboutBio />
      <SocialLinks />
      <CodingProfiles />
    </section>
  );
};
