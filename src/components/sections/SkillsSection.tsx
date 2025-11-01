export const SkillsSection = () => {
  // Documentation URLs for each skill
  const skillDocs: { [key: string]: string } = {
    // Programming Languages
    "Java": "https://docs.oracle.com/en/java/",
    "C++": "https://en.cppreference.com/w/",
    "Python": "https://docs.python.org/3/",

    // AI/ML Frameworks & Libraries
    "TensorFlow": "https://www.tensorflow.org/api_docs",
    "PyTorch": "https://pytorch.org/docs/stable/index.html",
    "Scikit-learn": "https://scikit-learn.org/stable/user_guide.html",
    "LangChain": "https://python.langchain.com/docs/get_started/introduction",
    "NumPy": "https://numpy.org/doc/stable/",
    "Pandas": "https://pandas.pydata.org/docs/",
    "Neural Networks": "https://www.deeplearningbook.org/",
    "Keras": "https://keras.io/api/",
    "ML Models": "https://scikit-learn.org/stable/supervised_learning.html",

    // Generative AI & LLMs
    "OpenAI API": "https://platform.openai.com/docs/api-reference",
    "Claude API": "https://docs.anthropic.com/claude/reference/getting-started-with-the-api",
    "Gemini API": "https://ai.google.dev/docs",
    "Hugging Face": "https://huggingface.co/docs",
    "BERT": "https://huggingface.co/docs/transformers/model_doc/bert",
    "T5": "https://huggingface.co/docs/transformers/model_doc/t5",
    "RAG Systems": "https://python.langchain.com/docs/use_cases/question_answering",
    "Vector Databases": "https://www.pinecone.io/learn/vector-database/",
    "Prompt Engineering": "https://platform.openai.com/docs/guides/prompt-engineering",

    // AI Specializations
    "Computer Vision": "https://opencv.org/",
    "Natural Language Processing": "https://www.nltk.org/",
    "Deep Learning": "https://www.deeplearningbook.org/",
    "Machine Learning": "https://scikit-learn.org/stable/",
    "Reinforcement Learning": "https://stable-baselines3.readthedocs.io/en/master/",
    "MLOps": "https://mlops.org/",
    "Model Fine-tuning": "https://huggingface.co/docs/transformers/training",
    "AI Agent Development": "https://python.langchain.com/docs/modules/agents/",

    // Backend Development
    "Node JS": "https://nodejs.org/en/docs/",
    "MySQL": "https://dev.mysql.com/doc/",
    "Mongo DB": "https://docs.mongodb.com/",

    // DevOps & Cloud
    "AWS": "https://docs.aws.amazon.com/",
    "Azure": "https://docs.microsoft.com/en-us/azure/",
    "Git": "https://git-scm.com/doc",
    "n8n": "https://docs.n8n.io/",
    "Docker": "https://docs.docker.com/",
    "Terraform": "https://www.terraform.io/docs",

    // Technical Expertise
    "DataStructures & Algorithms": "https://www.geeksforgeeks.org/data-structures/",
    "Competitive Programming": "https://cp-algorithms.com/",
    "Problem Solving": "https://leetcode.com/problemset/all/",
    "OOP": "https://docs.oracle.com/javase/tutorial/java/concepts/",
    "Software Engineering": "https://www.geeksforgeeks.org/software-engineering/",
    "DBMS": "https://www.geeksforgeeks.org/dbms/",
    "Computer Networks": "https://www.geeksforgeeks.org/computer-network-tutorials/",
    "Operating Systems": "https://www.geeksforgeeks.org/operating-systems/",

    // Tools & Platforms
    "VS Code": "https://code.visualstudio.com/docs",
    "Thunder Client": "https://www.thunderclient.com/",
    "Google Colab": "https://colab.research.google.com/",
    "Cursor": "https://cursor.sh/",
    "Jupyter Notebook": "https://jupyter-notebook.readthedocs.io/en/stable/",
    "Tableau": "https://help.tableau.com/current/pro/desktop/en-us/default.htm",
    "Power BI": "https://docs.microsoft.com/en-us/power-bi/",

    // Frontend Development
    "HTML": "https://developer.mozilla.org/en-US/docs/Web/HTML",
    "CSS/SCSS": "https://developer.mozilla.org/en-US/docs/Web/CSS",
    "Javascript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    "React Js": "https://reactjs.org/docs/getting-started.html",
  };

  const skillCategories = [
    {
      category: "Programming Languages",
      skills: [
        { name: "Java", level: "Advanced" },
        { name: "C++", level: "Advanced" },
        { name: "Python", level: "Advanced" },
      ],
    },
    {
      category: "🤖 AI/ML Frameworks & Libraries",
      skills: [
        { name: "TensorFlow", level: "Intermediate" },
        { name: "PyTorch", level: "Intermediate" },
        { name: "Scikit-learn", level: "Intermediate" },
        { name: "LangChain", level: "Intermediate" },
        { name: "NumPy", level: "Intermediate" },
        { name: "Pandas", level: "Intermediate" },
        { name: "Neural Networks", level: "Intermediate" },
        { name: "Keras", level: "Intermediate" },
        { name: "ML Models", level: "Intermediate" },
      ],
    },
    {
      category: "🧠 Generative AI & LLMs",
      skills: [
        { name: "OpenAI API", level: "Advanced" },
        { name: "Claude API", level: "Advanced" },
        { name: "Gemini API", level: "Advanced" },
        { name: "Hugging Face", level: "Advanced" },
        { name: "BERT", level: "Intermediate" },
        { name: "T5", level: "Intermediate" },
        { name: "RAG Systems", level: "Advanced" },
        { name: "Vector Databases", level: "Intermediate" },
        { name: "Prompt Engineering", level: "Advanced" },
      ],
    },
    {
      category: "🔬 AI Specializations",
      skills: [
        { name: "Computer Vision", level: "Advanced" },
        { name: "Natural Language Processing", level: "Advanced" },
        { name: "Deep Learning", level: "Advanced" },
        { name: "Machine Learning", level: "Advanced" },
        { name: "Reinforcement Learning", level: "Intermediate" },
        { name: "MLOps", level: "Intermediate" },
        { name: "Model Fine-tuning", level: "Intermediate" },
        { name: "AI Agent Development", level: "Advanced" },
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
      <h2 className="text-4xl font-bold text-foreground text-center select-none pointer-events-none focus:outline-none">
        AI & Technical Expertise
      </h2>

      <div className="max-w-5xl mx-auto space-y-10 px-4">
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="space-y-4">
            {/* Category Heading */}
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
              {cat.category}
            </h3>

            {/* Clickable Glassy Chips */}
            <div className="flex flex-wrap gap-4">
              {cat.skills.map((s, i) => {
                const docUrl = skillDocs[s.name];

                if (docUrl) {
                  return (
                    <a
                      key={i}
                      href={docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-5 py-2.5 rounded-full 
                                 bg-white/20 dark:bg-white/10
                                 text-foreground/90 
                                 backdrop-blur-lg border border-white/30
                                 shadow-sm hover:shadow-lg hover:scale-[1.05]
                                 hover:border-accent/50 hover:bg-white/25
                                 transition-all duration-300 cursor-pointer
                                 hover:text-blue-600 dark:hover:text-blue-400"
                      title={`${s.name} — ${s.level} (Click to view documentation)`}
                    >
                      <span className="text-sm md:text-base font-semibold tracking-wide">
                        {s.name}
                      </span>
                      <span className="ml-3 text-xs md:text-sm opacity-70 font-medium">
                        • {s.level}
                      </span>
                    </a>
                  );
                } else {
                  return (
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
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
