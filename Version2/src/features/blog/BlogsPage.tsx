import { Helmet } from "react-helmet-async";
import { BlogSection } from "./BlogSection";

const BlogsPage = () => {
    return (
        <div className="max-w-7xl mx-auto pb-8 pt-0 px-4">
            <Helmet>
                <title>Blogs | Sai Ram Maruri</title>
                <meta name="description" content="Technical blog posts, tutorials, and deep dives into GenAI, LLMs, and Software Engineering by Sai Ram Maruri." />
            </Helmet>
            <BlogSection />
        </div>
    );
};

export default BlogsPage;
