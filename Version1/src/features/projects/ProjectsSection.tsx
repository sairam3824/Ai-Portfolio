import { Card } from "@/shared/ui/card";
import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { projectsData } from "@/data/projectsData";

const liveProjects = projectsData.filter((project) => project.link).slice(0, 6);

export const ProjectsSection = () => {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      ref.current?.focus();
      return;
    }

    setQ("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const normalizedQuery = q.toLowerCase().trim();

  const filteredProjects = useMemo(() => {
    if (!normalizedQuery) {
      return projectsData;
    }

    return projectsData.filter((project) => {
      return (
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.category.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery) ||
        project.tech.some((tech) => tech.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [normalizedQuery]);

  const featuredProjects = filteredProjects.filter((project) => project.featured);
  const otherProjects = filteredProjects.filter((project) => !project.featured);

  const renderProjectCard = (project: (typeof projectsData)[number]) => {
    const primaryHref = project.link ?? project.github;

    return (
      <Card
        key={project.title}
        className="relative overflow-hidden border-2 border-border p-5 transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl sm:p-6 sm:hover:scale-105"
      >
        <span className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-blue-500 transition-transform duration-300 group-hover:scale-y-100" />

        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {project.category}
          </span>
        </div>

        {project.tagline ? (
          <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
            {project.tagline}
          </p>
        ) : null}

        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ExternalLink className="h-4 w-4" />
              {project.link ? "View Live" : "View Project"}
            </a>
          ) : null}

          {project.github && project.link ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          ) : null}
        </div>
      </Card>
    );
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <h2 className="select-none text-center text-2xl font-bold text-foreground sm:text-3xl">
            AI &amp; ML Projects
          </h2>

          <div className="flex w-full items-center justify-center sm:w-auto">
            <div
              className={`overflow-hidden rounded-full border border-border bg-background transition-all duration-300 flex items-center ${
                open ? "ml-2 w-[calc(100vw-7rem)] max-w-64 px-3 py-2 shadow sm:w-64" : "ml-2 w-0 px-0 py-0"
              }`}
            >
              <input
                ref={ref}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-transparent text-sm outline-none"
              />
              {q ? (
                <button onClick={() => setQ("")} className="ml-2" type="button">
                  ✖
                </button>
              ) : null}
            </div>

            <button
              aria-label="open search"
              onClick={() => setOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 transition hover:bg-secondary/20"
              type="button"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        <p className="max-w-2xl text-center text-sm text-muted-foreground sm:text-base">
          Shared project data now powers the full Version1 showcase, so the legacy
          experience stays in sync with the current portfolio content.
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <h4 className="mb-3 text-lg font-semibold text-foreground">Live Projects</h4>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          {liveProjects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card/40 px-5 py-2.5 text-sm font-semibold transition hover:bg-card/60 sm:w-auto sm:text-base"
            >
              {project.title} <ExternalLink className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {featuredProjects.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map(renderProjectCard)}
        </div>
      ) : null}

      {otherProjects.length ? (
        <div className="mt-16 border-t border-border pt-8">
          <h3 className="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
            Other Projects
          </h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {otherProjects.map(renderProjectCard)}
          </div>
        </div>
      ) : null}

      {!filteredProjects.length ? (
        <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center text-muted-foreground">
          No projects matched that search.
        </div>
      ) : null}
    </div>
  );
};
