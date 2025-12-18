import { BlogSection } from "./BlogSection";
import Layout from "@/shared/components/Layout";
import { usePageViewTracking } from "@/shared/hooks/useAnalytics";

const BlogsPage = () => {
  usePageViewTracking('blogs_page');

  return (
    <Layout title="Blogs">
      <div className="max-w-4xl mx-auto">
        <BlogSection />
      </div>
    </Layout>
  );
};

export default BlogsPage;