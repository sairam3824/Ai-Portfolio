import { Calendar, Eye, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/features/blog";
import * as Icons from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  onReadMore?: (postId: string) => void;
  onTagClick?: (tag: string) => void;
}

export const BlogCard = ({ post, onReadMore, onTagClick }: BlogCardProps) => {
  // Auto-correct common icon name issues (lowercase to PascalCase)
  const getIconComponent = (iconName: string) => {
    // Try the exact name first
    let icon = (Icons as any)[iconName];

    // If not found, try capitalizing first letter (e.g., "database" -> "Database")
    if (!icon && iconName) {
      const capitalized = iconName.charAt(0).toUpperCase() + iconName.slice(1);
      icon = (Icons as any)[capitalized];
    }

    // Fallback to BookOpen
    return icon || Icons.BookOpen;
  };

  const IconComponent = getIconComponent(post.icon);

  const getIconColorClasses = (color: string) => {
    const colorMap = {
      green: "bg-green-50 text-green-600",
      blue: "bg-blue-50 text-blue-600",
      purple: "bg-purple-50 text-purple-600",
      orange: "bg-orange-50 text-orange-600",
      red: "bg-red-50 text-red-600",
      yellow: "bg-yellow-50 text-yellow-600",
      gray: "bg-gray-50 text-gray-600",
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-50 text-gray-600";
  };

  const getTagColor = (tag: string) => {
    const tagColorMap: { [key: string]: string } = {
      // AI/ML Related
      "AI/ML": "bg-blue-100 text-blue-800",
      "OpenAI": "bg-purple-100 text-purple-800",
      "LLM": "bg-purple-100 text-purple-800",
      "Large Language Models": "bg-purple-100 text-purple-800",
      "RAG": "bg-sky-100 text-sky-800",
      "Vector Databases": "bg-fuchsia-100 text-fuchsia-800",
      "LangChain": "bg-cyan-100 text-cyan-800",
      "AI Orchestration": "bg-blue-100 text-blue-800",
      "Fine-Tuning": "bg-rose-100 text-rose-800",
      "NLP": "bg-lime-100 text-lime-800",
      "AI Innovation": "bg-indigo-100 text-indigo-800",
      "Production AI": "bg-emerald-100 text-emerald-800",
      "Generative AI": "bg-violet-100 text-violet-800",
      "Foundation Models": "bg-indigo-100 text-indigo-800",
      "Machine Learning": "bg-blue-100 text-blue-800",
      "Deep Learning": "bg-purple-100 text-purple-800",
      "Neural Networks": "bg-violet-100 text-violet-800",
      "MLOps": "bg-teal-100 text-teal-800",
      "AI Trends": "bg-sky-100 text-sky-800",
      "Future of AI": "bg-cyan-100 text-cyan-800",
      "AI Integration": "bg-blue-100 text-blue-800",
      
      // AI Security & Reliability
      "Hallucination": "bg-amber-100 text-amber-800",
      "AI Reliability": "bg-green-100 text-green-800",
      "Prompt Engineering": "bg-lime-100 text-lime-800",
      "Cybersecurity": "bg-red-100 text-red-800",
      "LLM Security": "bg-orange-100 text-orange-800",
      "Data Poisoning": "bg-red-100 text-red-800",
      "AI Safety": "bg-yellow-100 text-yellow-800",
      
      // Cloud & Infrastructure
      "Cloud Computing": "bg-green-100 text-green-800",
      "AWS": "bg-orange-100 text-orange-800",
      "AWS Bedrock": "bg-orange-100 text-orange-800",
      "AWS Lambda": "bg-amber-100 text-amber-800",
      "Serverless": "bg-yellow-100 text-yellow-800",
      "Serverless AI": "bg-amber-100 text-amber-800",
      "Event-Driven Architecture": "bg-lime-100 text-lime-800",
      "MCP Servers": "bg-indigo-100 text-indigo-800",
      "Data Architecture": "bg-slate-100 text-slate-800",
      
      // Programming & Development
      "Python": "bg-blue-100 text-blue-800",
      "Java": "bg-red-100 text-red-800",
      "C++": "bg-indigo-100 text-indigo-800",
      "Programming": "bg-slate-100 text-slate-800",
      "Data Science": "bg-teal-100 text-teal-800",
      "Automation": "bg-green-100 text-green-800",
      "Web Development": "bg-cyan-100 text-cyan-800",
      "Software Engineering": "bg-blue-100 text-blue-800",
      "Object-Oriented": "bg-purple-100 text-purple-800",
      "JVM": "bg-red-100 text-red-800",
      "Systems Development": "bg-gray-100 text-gray-800",
      "Performance": "bg-yellow-100 text-yellow-800",
      
      // DSA & Competitive Programming
      "DSA": "bg-indigo-100 text-indigo-800",
      "Competitive Programming": "bg-violet-100 text-violet-800",
      "LeetCode": "bg-yellow-100 text-yellow-800",
      "CodeChef": "bg-amber-100 text-amber-800",
      "Learning Journey": "bg-teal-100 text-teal-800",
      "Career Growth": "bg-emerald-100 text-emerald-800",
      "Algorithms": "bg-indigo-100 text-indigo-800",
      
      // Tools & Platforms
      "Agent Builder": "bg-teal-100 text-teal-800",
      "No-Code AI": "bg-lime-100 text-lime-800",
      "n8n": "bg-green-100 text-green-800",
      "Workflow Automation": "bg-emerald-100 text-emerald-800",
      "Open Source": "bg-blue-100 text-blue-800",
      "DevOps": "bg-cyan-100 text-cyan-800",
      "IDEs": "bg-indigo-100 text-indigo-800",
      "VS Code": "bg-blue-100 text-blue-800",
      "Cursor": "bg-purple-100 text-purple-800",
      "Kiro": "bg-cyan-100 text-cyan-800",
      "Antigravity": "bg-violet-100 text-violet-800",
      "AI Coding": "bg-fuchsia-100 text-fuchsia-800",
      "AI": "bg-blue-100 text-blue-800",
      "Tools": "bg-slate-100 text-slate-800",
      
      // Data & Databases
      "Embeddings": "bg-pink-100 text-pink-800",
      "Semantic Search": "bg-rose-100 text-rose-800",
      "Database Technology": "bg-slate-100 text-slate-800",
      "Knowledge Management": "bg-amber-100 text-amber-800",
      
      // Content Types
      "BiWeekly Digest": "bg-orange-100 text-orange-800",
      "Weekly Digest": "bg-orange-100 text-orange-800",
      "Technology": "bg-blue-100 text-blue-800",
      "Innovation": "bg-purple-100 text-purple-800",
      
      // Legal
      "Privacy": "bg-blue-100 text-blue-800",
      "Legal": "bg-green-100 text-green-800",
      "Policy": "bg-slate-100 text-slate-800",
      "Terms": "bg-purple-100 text-purple-800",
      "Conditions": "bg-gray-100 text-gray-800",
    };
    return tagColorMap[tag] || "bg-gray-100 text-gray-800";
  };

  const isExternal = !!post.externalLink;
  const LinkComponent = isExternal ? 'a' : Link;
  const linkProps = isExternal
    ? { href: post.externalLink, target: "_blank", rel: "noopener noreferrer" }
    : { to: `/blogs/${post.id}` };

  return (
    <article className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex items-start gap-3.5 flex-1">
        <div className="flex-shrink-0">
          <div className={`p-2.5 rounded-full ${getIconColorClasses(post.iconColor)}`}>
            <IconComponent className="w-5 h-5" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {isExternal ? (
            <a
              href={post.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
            </a>
          ) : (
            <Link to={`/blogs/${post.id}`} className="block group">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
            </Link>
          )}

          <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-gray-700 mb-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-gray-500" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick?.(tag)}
                className={`px-2.5 py-0.5 text-xs rounded-full transition-all hover:ring-2 hover:ring-offset-1 hover:ring-blue-400 cursor-pointer ${getTagColor(tag)}`}
                title={`Filter by ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-3 pt-3 border-t border-gray-100">
        {isExternal ? (
          <a
            href={post.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            Read Full Policy <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <Link
            to={`/blogs/${post.id}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            Read Article <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </article>
  );
};