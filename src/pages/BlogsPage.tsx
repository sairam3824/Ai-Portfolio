import { BlogSection } from "@/components/sections/BlogSection";
import Layout from "@/components/Layout";

const BlogsPage = () => {
  return (
    <Layout title="Blogs">
      <div className="max-w-4xl mx-auto">
        <BlogSection />
      </div>
    </Layout>
  );
};

export default BlogsPage;