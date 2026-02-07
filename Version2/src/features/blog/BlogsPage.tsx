import { BlogSection } from "./BlogSection";
import Seo from "../../shared/Seo";

const BlogsPage = () => {
    return (
        <div className="max-w-7xl mx-auto pb-8 pt-0 px-4">
            <Seo
                title="Blogs | Sai Ram Maruri"
                description="Technical blog posts, tutorials, and deep dives into GenAI, LLMs, and Software Engineering by Sai Ram Maruri."
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: "Blogs", url: "/blogs" },
                ]}
            />
            <BlogSection />
        </div>
    );
};

export default BlogsPage;
