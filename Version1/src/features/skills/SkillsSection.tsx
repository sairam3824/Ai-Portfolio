import { skillCategories } from "@/data/skillsData";

export const SkillsSection = () => {
  return (
    <section id="skills" className="scroll-mt-28 animate-fade-in space-y-10">
      <h2 className="pointer-events-none text-center text-2xl font-bold text-foreground select-none sm:text-4xl">
        AI & Technical Expertise
      </h2>

      <div className="mx-auto max-w-5xl space-y-8 px-0 sm:space-y-10 sm:px-4">
        {skillCategories.map((category) => (
          <div key={category.category} className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-foreground md:text-3xl">
                {category.category}
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">
                {category.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              {category.skills.map((skill) => {
                const classes =
                  "inline-flex items-center rounded-full px-4 py-2 sm:px-5 sm:py-2.5 bg-white/20 dark:bg-white/10 text-foreground/90 backdrop-blur-lg border border-white/30 shadow-sm transition-all duration-300";

                if (skill.url && skill.url !== "#") {
                  return (
                    <a
                      key={`${category.category}-${skill.name}`}
                      href={skill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${classes} cursor-pointer hover:scale-[1.05] hover:border-accent/50 hover:bg-white/25 hover:text-blue-600 hover:shadow-lg dark:hover:text-blue-500`}
                      title={`${skill.name} — ${skill.level}${skill.company ? ` • ${skill.company}` : ""}`}
                    >
                      <span className="text-xs font-semibold tracking-wide sm:text-sm md:text-base">
                        {skill.name}
                      </span>
                      <span className="ml-2 text-[11px] font-medium opacity-70 sm:ml-3 md:text-sm">
                        • {skill.level}
                      </span>
                    </a>
                  );
                }

                return (
                  <div
                    key={`${category.category}-${skill.name}`}
                    className={`${classes} hover:scale-[1.05] hover:border-accent/50 hover:bg-white/25 hover:shadow-lg`}
                    title={`${skill.name} — ${skill.level}${skill.company ? ` • ${skill.company}` : ""}`}
                  >
                    <span className="text-xs font-semibold tracking-wide sm:text-sm md:text-base">
                      {skill.name}
                    </span>
                    <span className="ml-2 text-[11px] font-medium opacity-70 sm:ml-3 md:text-sm">
                      • {skill.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
