import { Link } from "react-router-dom";
import { BlogPost } from "./blogData";
import {
    Calendar,
    Clock,
    ArrowRight,
    FileText
} from "lucide-react";
import { BlogIconMap } from "./blogIcons";

interface BlogCardProps {
    post: BlogPost;
    onTagClick?: (tag: string) => void;
}

export const BlogCard = ({ post }: BlogCardProps) => {
    const isExternal = !!post.externalLink;
    const IconComponent = BlogIconMap[post.icon] || FileText;

    const CardContent = () => (
        <div className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
            {/* Icon/Thumbnail area */}
            <div className={`shrink-0 w-16 h-16 rounded-xl flex items-center justify-center bg-gray-100/50 group-hover:scale-105 transition-transform duration-300 text-gray-500`}>
                <IconComponent className="w-8 h-8" strokeWidth={1.5} />
            </div>

            <div className="flex-1 min-w-0 py-1">
                <div className="flex items-center gap-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-md group-hover:bg-white group-hover:shadow-sm transition-all"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1 text-sm font-semibold">
                        Read <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
    );

    if (isExternal) {
        return (
            <a href={post.externalLink} target="_blank" rel="noopener noreferrer" className="block">
                <CardContent />
            </a>
        );
    }

    return (
        <Link to={`/blogs/${post.id}`} className="block">
            <CardContent />
        </Link>
    );
};
