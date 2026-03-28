import { useNavigate } from "react-router-dom";
import {
  Code,
  Trophy,
  FileText,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Home
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { SEO } from "@/shared/components";
import { badgeFiles } from "@/data/badgesData";
import { certifications } from "@/data/certificationsData";
import { codingProfilesData } from "@/data/codingProfilesData";
import { educationData } from "@/data/educationData";
import { projectsData } from "@/data/projectsData";
import { skillCategories } from "@/data/skillsData";
import { profileDetails, siteMetadata } from "@/data/siteMetadata";

/* BadgeBox — permanent rectangular badges section (glass / semi-transparent) */
function BadgeBox() {
  // safe public urls (encode to handle spaces/parenthesis)
  const badges = badgeFiles.map((name) => `/badges/${encodeURIComponent(name)}`);

  return (
    <div
      className={
        "badge-box z-30 mx-auto w-full rounded-xl border border-border bg-card/60 p-3 shadow-lg backdrop-blur-sm sm:p-4 md:w-[720px]"
      }
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-foreground">Badges</h4>
        <a
          href="/profile/badges"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs underline text-muted-foreground hover:text-primary"
        >
          View all badges
        </a>
      </div>

      {/* Horizontal scrolling carousel */}
        <div className="flex gap-3 overflow-x-auto overflow-y-hidden px-1 pb-2 snap-x snap-mandatory sm:gap-4">
          {badges.map((b, i) => {
          const name = badgeFiles[i].replace(".png", "");
          return (
            <div key={i} className="group relative flex items-center justify-center snap-start">
              {/* Tooltip on hover (desktop) */}
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-50 rounded-md bg-foreground/95 text-card text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {name}
              </span>

              <a
                href={b}
                target="_blank"
                rel="noopener noreferrer"
                download
                title={name}
                className="flex h-28 w-20 items-center justify-center overflow-hidden rounded-md border border-border bg-transparent p-1 transition-transform hover:-translate-y-1 hover:shadow-xl sm:h-32 sm:w-24 md:h-36 md:w-28"
                aria-label={name}
              >
                <img src={b} alt={name} className="w-full h-full object-contain" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================
   ProfilePage (main) — CODING FIRST
   Sections order: Coding Profiles -> About -> Resume -> Badges -> Projects -> Skills -> Education
   ================================ */
export const ProfilePage = () => {
  const navigate = useNavigate();
  const codingProfiles = codingProfilesData;
  const featuredProjects = projectsData.filter((project) => project.featured).slice(0, 4);
  const liveProjects = projectsData.filter((project) => project.link).slice(0, 4);
  const skills = skillCategories.slice(0, 4).map((category) => ({
    category: category.category,
    items: category.skills.slice(0, 5).map((skill) => skill.name).join(", "),
  }));
  const highlightedCertifications = certifications.slice(0, 4);
  const leetCodeProfile = codingProfilesData.find((profile) => profile.label === "LeetCode");
  const leetCodeStreak = codingProfilesData.find((profile) => profile.label === "LeetCode Streak");
  const codeChefProfile = codingProfilesData.find((profile) => profile.label === "CodeChef");
  const liveProjectCount = projectsData.filter((project) => project.link).length;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Professional Profile | ${profileDetails.name}`}
        description={`Extended profile view of ${profileDetails.name} with coding achievements, projects, skills, education, and badge highlights.`}
        canonicalPath="/profile"
        pageType="ProfilePage"
        keywords={[`${profileDetails.name} Profile`, "Competitive Programming Profile", "AI Engineer Profile"]}
      />
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-xl font-bold text-foreground">Professional Profile</h1>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="flex w-full items-center justify-center gap-2 sm:w-auto"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Main container with coding section first */}
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-12">
        {/* Coding Profiles & Stats (moved to top) */}
        <section id="coding-section" className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Code className="w-6 h-6" />
            Coding Profiles
          </h2>
          <p className="text-sm font-semibold text-muted-foreground mb-6">
            {leetCodeStreak?.stats ?? "1000+ problems solved"} • {leetCodeProfile?.stats ?? "2400+ • Guardian"} • {codeChefProfile?.stats ?? "3★ • 1600+"}
          </p>

          {/* Grid with left (fixed-ish), right (stats) */}
          <div className="grid gap-8 items-start md:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
            {/* Left column: coding profiles */}
            <div className="space-y-3">
              {codingProfiles.map((profile) => (
                <div key={`${profile.label}-${profile.href}`} className="block">
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 hover:text-primary transition-colors group"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-lg group-hover:text-primary">
                        {profile.label}
                      </p>
                      <p
                        className={`text-sm text-muted-foreground ${profile.stats !== "Active" &&
                          profile.stats !== "Global Rank" &&
                          profile.stats !== "1000+ problems solved"
                          ? "font-bold"
                          : ""
                          }`}
                      >
                        {profile.stats}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </a>
                </div>
              ))}
            </div>

            {/* Right column: stat circles */}
            <div className="mx-auto grid w-full max-w-[18rem] grid-cols-2 gap-4 place-items-center sm:max-w-none sm:w-fit sm:gap-6">
              {/* Circle 1 */}
              <div className="flex flex-col items-center group cursor-default">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:h-32 sm:w-32 md:h-36 md:w-36">
                  <p className="text-2xl font-bold text-primary/80 sm:text-3xl">{liveProjectCount}</p>
                </div>
                <p className="mt-2 text-center text-xs font-medium text-foreground sm:text-sm">Live<br />Projects</p>
              </div>

              {/* Circle 2 */}
              <div className="flex flex-col items-center group cursor-default">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:h-32 sm:w-32 md:h-36 md:w-36">
                  <p className="text-2xl font-bold text-primary/80 sm:text-3xl">{projectsData.length}+</p>
                </div>
                <p className="mt-2 text-center text-xs font-medium text-foreground sm:text-sm">Total<br />Projects</p>
              </div>

              {/* Circle 3 */}
              <div className="flex flex-col items-center group cursor-default">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:h-32 sm:w-32 md:h-36 md:w-36">
                  <p className="text-xl font-bold text-primary/80 sm:text-2xl">{leetCodeStreak?.stats.split(" ")[0] ?? "1000+"}</p>
                </div>
                <p className="mt-2 text-center text-xs font-medium text-foreground sm:text-sm">Problems<br />Solved</p>
              </div>

              {/* Circle 4 */}
              <div className="flex flex-col items-center group cursor-default">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:h-32 sm:w-32 md:h-36 md:w-36">
                  <p className="text-2xl font-bold text-primary/80 sm:text-3xl">{certifications.length}</p>
                </div>
                <p className="mt-2 text-center text-xs font-medium text-foreground sm:text-sm">Active<br />Certifications</p>
              </div>
            </div>
          </div>
        </section>

        {/* About (moved below coding) */}
        <section id="about-section">
          <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
          <Card className="p-6">
            <p className="text-muted-foreground mb-4">
              {profileDetails.role} {profileDetails.summary}
            </p>
            <div className="flex gap-3">
              <a href={profileDetails.socials.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-sm">
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a href={profileDetails.socials.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-sm">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </Card>
        </section>

        {/* Resume */}
        <section id="resume-section">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Resume
            </h2>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Button variant="outline" onClick={() => window.open(profileDetails.resumeHref, "_blank")} size="sm" className="w-full sm:w-auto">
                <FileText className="w-4 h-4 mr-2" />
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = profileDetails.resumeHref;
                  link.download = profileDetails.resumeHref.split("/").pop() ?? "resume.pdf";
                  link.click();
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </section>

        {/* Badges section */}
        <section id="badges-section" className="pt-2 pb-6">
          <BadgeBox />
        </section>

        {/* Key Projects */}
        <section id="projects-section">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            Key Projects
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <Card
                key={project.title}
                className="p-6 hover:border-primary hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col justify-between min-h-[140px] rounded-2xl"
              >
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">{project.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{project.tech.slice(0, 4).join(", ")}</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <a
                    href={project.link ?? project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    View
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <span className="text-xs text-muted-foreground">{project.link ? "Live" : "Code"}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Live Projects — compact pill buttons */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-foreground mb-3">Live Projects</h4>
            <div className="flex flex-wrap gap-3">
              {liveProjects.map((project) => (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/40 hover:bg-card/60 transition text-base font-semibold"
                >
                  {project.title} <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </section>


        {/* Skills */}
        <section id="skills-section">
          <h2 className="text-2xl font-bold text-foreground mb-4">Skills</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {skills.map((skill) => (
              <Card key={skill.category} className="p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{skill.category}</p>
                <p className="text-xs text-muted-foreground">{skill.items}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications (inserted after Skills) */}
        <section id="certifications-section">
          <h2 className="text-2xl font-bold text-foreground mb-4">Certifications</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {highlightedCertifications.map((certification) => (
              <Card key={certification.title} className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{certification.title}</h3>
                <a href={certification.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  View Certificate <ExternalLink className="w-3 h-3" />
                </a>
              </Card>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education-section">
          <h2 className="text-2xl font-bold text-foreground mb-4">Education</h2>
          <Card className="p-6">
            <h3 className="font-semibold text-foreground">
              {educationData[0].title} {educationData[0].major}
            </h3>
            <p className="text-sm text-muted-foreground">
              {educationData[0].org} {educationData[0].campus ? `• ${educationData[0].campus}` : ""} • {educationData[0].date} • {educationData[0].grade}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {educationData[0].courses.join(", ")}
            </p>
          </Card>
        </section>
      </div>

      <footer className="w-full py-4 border-t border-border bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">© {siteMetadata.copyrightYear} {profileDetails.name}</p>
        </div>
      </footer>
    </div>
  );
};
