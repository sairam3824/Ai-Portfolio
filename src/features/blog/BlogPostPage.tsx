import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Eye, Share2, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import Layout from "@/shared/components/Layout";
import { getBlogPost } from "./index";
import { Button } from "@/shared/ui/button";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  
  const post = getBlogPost(slug || "");

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  
  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      // Ignore errors
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Ignore errors
    }
  };

  return (
    <Layout title={post.title}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link 
          to="/blogs" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Link>

        <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 md:p-10">
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </header>

            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
              {post.content && (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              )}
            </div>

            <div className="flex items-center gap-4 mt-10 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                onClick={handleNativeShare}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" /> Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={copyLink}
                className="gap-2"
              >
                <LinkIcon className="w-4 h-4" /> {copied ? "Copied" : "Copy link"}
              </Button>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default BlogPostPage;
