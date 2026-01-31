import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "../blog/blogData";
import BentoCard from "./BentoCard";

const BlogPreview = () => {
    const latestPosts = blogPosts.slice(0, 2);
    if (latestPosts.length === 0) return null;

    return (
        <BentoCard className="col-span-12 md:col-span-7" ghostChar="B" delay={600}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Latest Posts</h3>
                <Link
                    to="/blogs"
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 tracking-wide transition-colors"
                >
                    All {blogPosts.length} <ArrowRight className="w-3 h-3" />
                </Link>
            </div>

            <div className="flex flex-col gap-3">
                {latestPosts.map((post) => (
                    <Link
                        key={post.id}
                        to={post.externalLink ? post.externalLink : `/blogs/${post.id}`}
                        className="flex flex-col gap-3 p-4 rounded-2xl bg-gray-50/60 hover:bg-gray-100/70 border border-transparent hover:border-gray-200/60 transition-all duration-300"
                    >
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-sm shadow-indigo-500/20">
                            <BookOpen className="w-4 h-4" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2">{post.title}</h4>
                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                        <div className="flex items-center gap-3 mt-auto pt-1">
                            <span className="flex items-center gap-1 text-xs font-medium text-gray-400">
                                <Calendar className="w-3 h-3" />
                                {post.date}
                            </span>
                            <span className="text-xs font-medium text-gray-400">{post.readTime}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </BentoCard>
    );
};

export default BlogPreview;
