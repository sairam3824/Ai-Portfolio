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
    <div className="animate-fade-in space-y-8">
      <h2 className="text-3xl font-bold text-foreground text-center">
        Skills & Expertise
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((cat, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-fit"
          >
            <h3 className="text-lg font-semibold text-accent mb-4 text-left">
              {cat.category}
            </h3>

            <div className="space-y-3">
              {cat.skills.map((skill, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-medium text-foreground text-sm">{skill.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
