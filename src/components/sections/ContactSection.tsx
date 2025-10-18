import { Mail, Phone, Github, Linkedin, Code, Trophy, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/sairam3824", category: "social" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sairam-maruri", category: "social" },
];

const codingProfiles = [
  { icon: Code, label: "LeetCode", href: "https://leetcode.com/u/sairam3824", category: "coding" },
  { icon: Trophy, label: "CodeChef", href: "https://www.codechef.com/users/sairam2004", category: "coding" },
  { icon: BookOpen, label: "InterviewBit", href: "https://www.interviewbit.com/profile/sai-rama-linga-reddy-maruri/", category: "coding" },
  { icon: Target, label: "TakeUForward", href: "https://takeuforward.org/plus/profile/sairam3824", category: "coding" },
];

export const ContactSection = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <h2 className="text-3xl font-bold text-foreground text-center">Let's Connect</h2>
      <div className="space-y-8">
        <p className="text-lg text-muted-foreground text-center">
          I'm always excited to collaborate on interesting projects or just have a chat about AI,
          technology, and creative possibilities.
        </p>

        {/* Contact Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center text-center">
          {/* Email Button */}
          <a
            href="mailto:sairam.maruri@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-medium"
          >
            <Mail className="w-4 h-4" />
            Send me an email
          </a>

          {/* Phone Button */}
          <a
            href="tel:+917893865644"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-medium"
          >
            <Phone className="w-4 h-4" />
            +91 7893865644
          </a>

          {/* Resume Button (secondary CTA) */}
          <a
            href="/Sai_Ram_Maruri_Resume_2025.pdf"
            download="Sai_Ram_Maruri_Resume_2025.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
            </svg>
            Download Resume
          </a>
        </div>

        {/* Social Media Section */}
        <div className="pt-6 space-y-4">
          <p className="text-sm font-medium text-muted-foreground">Connect with me</p>
          <div className="grid grid-cols-2 gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-card border-2 border-border hover:border-accent transition-all duration-300 hover:scale-105 flex items-center gap-3"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Coding Profiles Section */}
        <div className="pt-6 space-y-4">
          <p className="text-sm font-medium text-muted-foreground">My coding profiles</p>
          <div className="grid grid-cols-2 gap-4">
            {codingProfiles.map((profile, index) => (
              <a
                key={index}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-card border-2 border-border hover:border-accent transition-all duration-300 hover:scale-105 flex items-center gap-3"
                aria-label={profile.label}
              >
                <profile.icon className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">{profile.label}</span>
              </a>
            ))}
          </div>
        </div>
        {/* Quick Stats */}
        <div className="pt-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-3xl font-extrabold text-center text-foreground mb-8 tracking-tight">
              Quick Stats
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {/* Stat 1 */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-extrabold text-blue-600 group-hover:text-blue-700 transition-colors">
                  450+
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  CodeChef Problems
                </div>
              </div>

              {/* Stat 2 */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-extrabold text-blue-600 group-hover:text-blue-700 transition-colors">
                  750+
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  LeetCode Problems
                </div>
              </div>

              {/* Stat 3 */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-extrabold text-blue-600 group-hover:text-blue-700 transition-colors">
                  1500+
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  CodeChef Rating
                </div>
              </div>

              {/* Stat 4 */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-extrabold text-blue-600 group-hover:text-blue-700 transition-colors">
                  10+
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  GitHub Projects
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 bg-pink-50 text-pink-600 text-sm rounded-full">
            🚀 AI Enthusiast
          </span>
          <span className="px-4 py-2 bg-blue-50 text-blue-600 text-sm rounded-full">
            2⭐️ Codechef 
          </span>
          <span className="px-4 py-2 bg-purple-50 text-purple-600 text-sm rounded-full">
            💡 Software Developer
          </span>
          
        </div>

      </div>
    </div>
  );
};
