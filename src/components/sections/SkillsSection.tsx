export const SkillsSection = () => {
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: [
        { name: "Java", level: "Advanced" },
        { name: "C++", level: "Intermediate" },
        { name: "Python", level: "Advanced" },
      ],
    },
    {
      category: "AI/ML Tools",
      skills: [
        { name: "TensorFlow", level: "Intermediate" },
        { name: "PyTorch", level: "Intermediate" },
        { name: "Scikit-learn", level: "Intermediate" },
        { name: "LangChain", level: "Intermediate" },
        { name: "NumPy", level: "Intermediate" },
        { name: "Pandas", level: "Intermediate" },
        { name: "Neural Networks", level: "Intermediate" },
        { name: "Seaborn", level: "Intermediate" },
      ],
    },
    {
      category: "Generative AI & LLMs",
      skills: [
        { name: "OpenAI API", level: "Advanced" },
        { name: "Claude", level: "Intermediate" },
        { name: "BERT", level: "Intermediate" },
        { name: "Hugging Face", level: "Intermediate" },
        { name: "T5", level: "Intermediate" },
        { name: "Qwen", level: "Intermediate" },
      ],
    },
    {
      category: "Backend Development",
      skills: [
        { name: "Node JS", level: "Intermediate" },
        { name: "MySQL", level: "Intermediate" },
        { name: "Mongo DB", level: "Intermediate" },
      ],
    },
    {
      category: "DevOps & Cloud",
      skills: [
        { name: "AWS", level: "Intermediate" },
        { name: "Azure", level: "Intermediate" },
        { name: "Git", level: "Beginner" },
        { name: "n8n", level: "Intermediate" },
        { name: "Docker", level: "Beginner" },
        { name: "Terraform", level: "Beginner" },
      ],
    },
    {
      category: "Technical Expertise",
      skills: [
        { name: "DataStructures & Algorithms", level: "Advanced" },
        { name: "Competitive Programming", level: "Advanced" },
        { name: "Problem Solving", level: "Advanced" },
        { name: "OOP", level: "Advanced" },
        { name: "Software Engineering", level: "Intermediate" },
        { name: "DBMS", level: "Intermediate" },
        { name: "Computer Networks", level: "Intermediate" },
        { name: "Operating Systems", level: "Intermediate" },
      ],
    },
    {
      category: "Tools & Platforms",
      skills: [
        { name: "VS Code", level: "Advanced" },
        { name: "Thunder Client", level: "Advanced" },
        { name: "Google Colab", level: "Advanced" },
        { name: "Cursor", level: "Intermediate" },
        { name: "Jupyter Notebook", level: "Intermediate" },
        { name: "Tableau", level: "Beginner" },
        { name: "Power BI", level: "Beginner" },
      ],
    },
    {
      category: "Frontend Development",
      skills: [
        { name: "HTML", level: "Beginner" },
        { name: "CSS/SCSS", level: "Beginner" },
        { name: "Javascript", level: "Beginner" },
        { name: "React Js", level: "Beginner" },
      ],
    },
  ];

  return (
    <section id="skills" className="scroll-mt-28 animate-fade-in space-y-10">
      <h2 className="text-4xl font-bold text-foreground text-center select-none pointer-events-none">
        Skills & Expertise
      </h2>

      <div className="max-w-5xl mx-auto space-y-10 px-4">
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="space-y-4">
            {/* Category Heading */}
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
              {cat.category}
            </h3>

            {/* Glassy Chips (tuned sizes) */}
            <div className="flex flex-wrap gap-4">
              {cat.skills.map((s, i) => (
                <div
                  key={i}
                  className="inline-flex items-center px-5 py-2.5 rounded-full 
                             bg-white/20 dark:bg-white/10
                             text-foreground/90 
                             backdrop-blur-lg border border-white/30
                             shadow-sm hover:shadow-lg hover:scale-[1.05]
                             hover:border-accent/50 hover:bg-white/25
                             transition-all duration-300"
                  title={`${s.name} — ${s.level}`}
                >
                  <span className="text-sm md:text-base font-semibold tracking-wide">
                    {s.name}
                  </span>
                  <span className="ml-3 text-xs md:text-sm opacity-70 font-medium">
                    • {s.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
