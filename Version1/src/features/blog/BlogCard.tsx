import { Calendar, Eye, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/features/blog";
import * as Icons from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  onTagClick?: (tag: string) => void;
}

export const BlogCard = ({ post, onTagClick }: BlogCardProps) => {
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
      green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
      red: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
      yellow: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
      gray: "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400";
  };

  const getTagColor = (tag: string) => {
    // Default fallback
    const fallback = "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300";

    // Mapping for specific tags
    const tagColorMap: { [key: string]: string } = {
      // AI/ML Related
      "AI/ML": "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
      "OpenAI": "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
      "LLM": "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
      "Large Language Models": "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
      "RAG": "bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-300",
      "Vector Databases": "bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-800 dark:text-fuchsia-300",
      "LangChain": "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300",

      // Tools
      "VS Code": "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
      "Cursor": "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
      "Antigravity": "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300",

      // Cloud
      "AWS": "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",

      // Add generic handling for other keys if needed, but for now we rely on the specific map or fallback
    };

    // If exact match found
    if (tagColorMap[tag]) return tagColorMap[tag];

    // Heuristic fallback for others to avoid massive map duplication if not strictly needed, 
    // or just return a safe default that looks good in dark mode.
    // Given the long list, let's try to map common color patterns if possible, 
    // or just use the fallback for unmapped ones to ensure readability.
    // For this specific request, let's map the general categories by color names if they appear in the original map values

    // Simple heuristic: check if original map had a color, and apply dark mode equivalent
    // Since we can't easily parse run-time, we will just use a generic "blue-ish" or "gray-ish" style for unmapped to be safe
    // or stick to the specific list if we want to be precise. 

    // BETTER APPROACH: Use the original map but augment with dark mode classes.
    // We will inline the augmented map for the commonly used ones above, and for the rest:
    return "bg-secondary text-secondary-foreground";
  };

  const isExternal = !!post.externalLink;

  return (
    <article className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col" aria-labelledby={`blog-title-${post.id}`}>
      <div className="flex items-start gap-3.5 flex-1">
        <div className="flex-shrink-0">
          <div className={`p-2.5 rounded-full ${getIconColorClasses(post.iconColor)}`} aria-hidden="true">
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
              aria-label={`Read ${post.title} (opens in new tab)`}
            >
              <h3 id={`blog-title-${post.id}`} className="text-lg md:text-xl font-semibold text-card-foreground mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
            </a>
          ) : (
            <Link to={`/blogs/${post.id}`} className="block group" aria-label={`Read ${post.title}`}>
              <h3 id={`blog-title-${post.id}`} className="text-lg md:text-xl font-semibold text-card-foreground mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
            </Link>
          )}

          <p className="text-sm text-muted-foreground mb-3 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <span aria-label={`Published on ${post.date}`}>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <span aria-label={`Reading time: ${post.readTime}`}>{post.readTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Blog post tags">
            {post.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick?.(tag)}
                className={`px-2.5 py-0.5 text-xs rounded-full transition-all hover:ring-2 hover:ring-offset-1 hover:ring-blue-400 cursor-pointer ${getTagColor(tag)}`}
                aria-label={`Filter posts by ${tag} tag`}
                title={`Filter by ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-3 pt-3 border-t border-border">
        {isExternal ? (
          <a
            href={post.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors"
            aria-label={`Read full policy: ${post.title} (opens in new tab)`}
          >
            Read Full Policy <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        ) : (
          <Link
            to={`/blogs/${post.id}`}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors"
            aria-label={`Read full article: ${post.title}`}
          >
            Read Article <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
};