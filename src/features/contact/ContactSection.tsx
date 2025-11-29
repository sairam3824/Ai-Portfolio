import { useState } from "react";
import { Mail, Phone, Github, Linkedin, Code, Trophy, BookOpen, Target, MessageSquare } from "lucide-react";
import { MessageDialog } from "./MessageDialog";

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
  const [anonymousDialogOpen, setAnonymousDialogOpen] = useState(false);

  return (
    <div className="animate-fade-in space-y-6">
      <h2 className="text-3xl font-bold text-foreground text-center select-none pointer-events-none focus:outline-none">
        Let's Connect
      </h2>

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

          {/* Message Button */}
          <button
            onClick={() => setAnonymousDialogOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-medium"
          >
            <MessageSquare className="w-4 h-4" />
            Send Message
          </button>

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

        <MessageDialog 
          open={anonymousDialogOpen} 
          onOpenChange={setAnonymousDialogOpen} 
        />

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
        <div className="pt-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-3xl font-extrabold text-center text-foreground mb-8 tracking-tight">
              Quick Stats
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {/* Stat 1 - CodeChef Problems */}
              <a
                href="https://www.codechef.com/users/sairam2004"
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="text-4xl font-extrabold text-blue-600 group-hover:text-blue-700 transition-colors">
                  500+
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium group-hover:text-blue-600 transition-colors">
                  CodeChef Problems
                </div>
              </a>

              {/* Stat 2 - LeetCode Problems */}
              <a
                href="https://leetcode.com/u/sairam3824/"
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="text-4xl font-extrabold text-blue-600 group-hover:text-blue-700 transition-colors">
                  800+
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium group-hover:text-blue-600 transition-colors">
                  LeetCode Problems
                </div>
              </a>

              {/* Stat 3 - LeetCode Rating */}
              <a
                href="https://leetcode.com/u/programmer3824/"
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="text-4xl font-extrabold text-blue-600 group-hover:text-blue-700 transition-colors">
                  2300+
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium group-hover:text-blue-600 transition-colors">
                  LeetCode Rating
                </div>
              </a>

              {/* Stat 4 - CodeChef Rating */}
              <a
                href="https://www.codechef.com/users/sairam2004"
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="text-4xl font-extrabold text-blue-600 group-hover:text-blue-700 transition-colors">
                  1600+
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium group-hover:text-blue-600 transition-colors">
                  CodeChef Rating
                </div>
              </a>

              {/* Stat 5 - GitHub Projects */}
              <a
                href="https://github.com/sairam3824"
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="text-4xl font-extrabold text-blue-600 group-hover:text-blue-700 transition-colors">
                  15+
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium group-hover:text-blue-600 transition-colors">
                  GitHub Projects
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="/blogs"
            className="px-4 py-2 bg-pink-50 text-pink-600 text-sm rounded-full hover:bg-pink-100 transition-colors duration-200 cursor-pointer inline-flex items-center"
          >
            🚀 GenAI Enthusiast
          </a>
          <a
            href="https://www.codechef.com/users/sairam2004"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-50 text-blue-600 text-sm rounded-full hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
          >
            3⭐️ Codechef
          </a>
          <a
            href="https://leetcode.com/u/programmer3824/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-50 text-purple-600 text-sm rounded-full hover:bg-purple-100 transition-colors duration-200 cursor-pointer"
          >
            🛡️ LeetCode Knight (2100+) @programmer3824
          </a>

        </div>

      </div>
    </div>
  );
};
