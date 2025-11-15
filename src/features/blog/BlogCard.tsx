import { Calendar, Eye, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/content/blogs";
import * as Icons from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  onReadMore?: (postId: string) => void;
}

export const BlogCard = ({ post, onReadMore }: BlogCardProps) => {
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
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-50 text-gray-600";
  };

  const getTagColor = (tag: string) => {
    const tagColorMap: { [key: string]: string } = {
      "AI/ML": "bg-blue-100 text-blue-800",
      "OpenAI": "bg-purple-100 text-purple-800",
      "Cloud Computing": "bg-green-100 text-green-800",
      "Weekly Digest": "bg-orange-100 text-orange-800",
      "Privacy": "bg-blue-100 text-blue-800",
      "Legal": "bg-green-100 text-green-800",
      "Policy": "bg-gray-100 text-gray-800",
      "Terms": "bg-purple-100 text-purple-800",
      "Conditions": "bg-gray-100 text-gray-800",
    };
    return tagColorMap[tag] || "bg-gray-100 text-gray-800";
  };

  const handleAction = () => {
    if (post.externalLink) {
      window.location.href = post.externalLink;
    } else if (onReadMore) {
      onReadMore(post.id);
    }
  };

  return (
    <article className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className={`p-3 rounded-full ${getIconColorClasses(post.iconColor)}`}>
            <IconComponent className="w-6 h-6" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-3 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-500" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-xs rounded-full ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 flex-wrap mt-4">
            <button
              onClick={handleAction}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
            >
              {post.externalLink ? "Read Full Policy" : "Read More"} <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};