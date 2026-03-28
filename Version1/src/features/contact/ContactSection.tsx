import { useState } from "react";
import { Mail, Phone, Github, Linkedin, Code, Trophy, BookOpen, Target, MessageSquare } from "lucide-react";
import { MessageDialog } from "./MessageDialog";
import { codingProfilesData } from "@/data/codingProfilesData";
import { profileDetails } from "@/data/siteMetadata";
import { projectsData } from "@/data/projectsData";

const socialLinks = [
  { icon: Github, label: "GitHub", href: profileDetails.socials.github },
  { icon: Linkedin, label: "LinkedIn", href: profileDetails.socials.linkedin },
];

const codingProfileIcons = {
  LeetCode: Code,
  CodeChef: Trophy,
  InterviewBit: BookOpen,
  TakeUForward: Target,
};

const codingProfiles = codingProfilesData
  .filter((profile) => profile.label in codingProfileIcons)
  .map((profile) => ({
    ...profile,
    icon: codingProfileIcons[profile.label as keyof typeof codingProfileIcons],
  }));

export const ContactSection = () => {
  const [anonymousDialogOpen, setAnonymousDialogOpen] = useState(false);
  const leetCodeProfile = codingProfilesData.find((profile) => profile.label === "LeetCode");
  const leetCodeStreak = codingProfilesData.find((profile) => profile.label === "LeetCode Streak");
  const codeChefProfile = codingProfilesData.find((profile) => profile.label === "CodeChef");
  const totalProjects = projectsData.length;
  const liveProjects = projectsData.filter((project) => project.link).length;
  const solvedProblems = leetCodeStreak?.stats.split(" ")[0] ?? "1000+";

  return (
    <div className="animate-fade-in space-y-6">
      <h2 className="text-3xl font-bold text-foreground text-center select-none pointer-events-none focus:outline-none">
        Let's Connect
      </h2>

      <div className="space-y-8">
        <p className="text-base text-center text-muted-foreground sm:text-lg">
          I'm always excited to collaborate on interesting projects or just have a chat about AI,
          technology, and creative possibilities.
        </p>

        {/* Contact Actions */}
        <div className="flex flex-col items-stretch justify-center gap-3 text-center sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          {/* Email Button */}
          <a
            href={`mailto:${profileDetails.email}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-700 sm:w-auto sm:py-2"
          >
            <Mail className="w-4 h-4" />
            Send me an email
          </a>

          {/* Phone Button */}
          <a
            href={`tel:${profileDetails.phone.replace(/\s+/g, "")}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-700 sm:w-auto sm:py-2"
          >
            <Phone className="w-4 h-4" />
            {profileDetails.phone}
          </a>

          {/* Message Button */}
          <button
            onClick={() => setAnonymousDialogOpen(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-700 sm:w-auto sm:py-2"
          >
            <MessageSquare className="w-4 h-4" />
            Send Message
          </button>

          {/* Resume Button (secondary CTA) */}
          <a
            href={profileDetails.resumeHref}
            download={profileDetails.resumeHref.split("/").pop()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-700 sm:w-auto sm:py-2"
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border-2 border-border bg-card p-4 transition-all duration-300 hover:scale-[1.02] hover:border-accent sm:hover:scale-105"
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {codingProfiles.map((profile) => (
              <a
                key={profile.label}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border-2 border-border bg-card p-4 transition-all duration-300 hover:scale-[1.02] hover:border-accent sm:hover:scale-105"
                aria-label={profile.label}
              >
                <profile.icon className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">{profile.label}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="pt-8">
          <div className="rounded-2xl border border-border bg-muted/30 p-6 shadow-sm transition-all duration-300 dark:bg-muted/10 sm:p-10">
            <h3 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Quick Stats
            </h3>

            <div className="grid grid-cols-2 gap-5 text-center md:grid-cols-5 md:gap-6">
              {/* Stat 1 - CodeChef Problems */}
              <a
                href={codeChefProfile?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="text-3xl font-extrabold text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-500 dark:group-hover:text-blue-400 sm:text-4xl">
                  {codeChefProfile?.stats ?? "3★ • 1600+"}
                </div>
                <div className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 sm:text-sm md:text-base">
                  CodeChef
                </div>
              </a>

              {/* Stat 2 - LeetCode Problems */}
              <a
                href={leetCodeStreak?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="text-3xl font-extrabold text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-500 dark:group-hover:text-blue-400 sm:text-4xl">
                  {solvedProblems}
                </div>
                <div className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 sm:text-sm md:text-base">
                  Problems Solved
                </div>
              </a>

              {/* Stat 3 - LeetCode Rating */}
              <a
                href={leetCodeProfile?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="text-3xl font-extrabold text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-500 dark:group-hover:text-blue-400 sm:text-4xl">
                  {leetCodeProfile?.stats ?? "2400+ • Guardian"}
                </div>
                <div className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 sm:text-sm md:text-base">
                  LeetCode
                </div>
              </a>

              {/* Stat 4 - CodeChef Rating */}
              <a
                href={projectsData.find((project) => project.link)?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="text-3xl font-extrabold text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-500 dark:group-hover:text-blue-400 sm:text-4xl">
                  {liveProjects}+
                </div>
                <div className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 sm:text-sm md:text-base">
                  Live Projects
                </div>
              </a>

              {/* Stat 5 - GitHub Projects */}
              <a
                href={profileDetails.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="text-3xl font-extrabold text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-500 dark:group-hover:text-blue-400 sm:text-4xl">
                  {totalProjects}+
                </div>
                <div className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 sm:text-sm md:text-base">
                  Total Projects
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">

          <a
            href="/blogs"
            className="px-4 py-2 bg-pink-50 text-pink-600 text-sm rounded-full hover:bg-pink-100 transition-colors duration-200 cursor-pointer inline-flex items-center gap-1"
          >
            🚀 GenAI Enthusiast
          </a>

          <a
            href={codeChefProfile?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-slate-100 text-slate-800 text-sm rounded-full hover:bg-slate-200 transition-colors duration-200 cursor-pointer inline-flex items-center gap-1"
          >
            🍽️ {codeChefProfile?.stats ?? "3★ • 1600+"}
          </a>

          <a
            href={leetCodeProfile?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-50 text-purple-600 text-sm rounded-full hover:bg-purple-100 transition-colors duration-200 cursor-pointer inline-flex items-center gap-1"
          >
            🛡️ {leetCodeProfile?.label} {leetCodeProfile?.stats ? `(${leetCodeProfile.stats})` : ""}
          </a>

        </div>

      </div>
    </div>
  );
};
