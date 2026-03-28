import { blogPosts, BlogPost } from "./blogData";

export const useBlogPosts = () => {
    return { posts: blogPosts as BlogPost[], loading: false, error: null as string | null, refetch: () => {} };
};
