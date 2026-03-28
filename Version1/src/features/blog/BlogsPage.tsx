import { BlogSection } from "./BlogSection";
import Layout from "@/shared/components/Layout";

const BlogsPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <BlogSection />
      </div>
    </Layout>
  );
};

export default BlogsPage;
