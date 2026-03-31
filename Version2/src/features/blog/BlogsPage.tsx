import { BlogSection } from "./BlogSection";
import Seo from "../../shared/Seo";
import { ROUTE_PATHS, WRITING_LABEL } from "@/data/siteRoutes";

const BlogsPage = () => {
    return (
        <div className="max-w-7xl mx-auto pb-8 pt-0 px-4">
            <Seo
                title={`${WRITING_LABEL} | Sai Ram Maruri — AI & Engineering Writing`}
                description="30+ technical writing pieces by Sai Ram Maruri on GenAI, LLMs, RAG systems, AWS cloud, agentic workflows, MCP, A2A, context engineering, competitive programming, and software engineering."
                pageType="CollectionPage"
                keywords={["AI Blog", "GenAI Blog", "LLM Tutorial", "RAG Tutorial", "AWS Blog", "Competitive Programming Blog", "Tech Writing", "Sai Ram Maruri Blog", "Context Engineering", "Agentic AI"]}
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: WRITING_LABEL, url: ROUTE_PATHS.writing },
                ]}
            />
            <BlogSection />
        </div>
    );
};

export default BlogsPage;
