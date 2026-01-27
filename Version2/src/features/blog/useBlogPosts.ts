import { useState } from "react";
import { blogPosts, BlogPost } from "./blogData";

export const useBlogPosts = () => {
    const [posts] = useState<BlogPost[]>(blogPosts);
    const [loading] = useState(false);
    const [error] = useState<string | null>(null);

    const refetch = () => {
        // No-op since we're using static posts
    };

    return { posts, loading, error, refetch };
};
