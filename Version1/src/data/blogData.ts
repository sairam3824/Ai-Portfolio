export type { BlogPost } from "../../../shared-data/blogData";
export { blogPosts } from "../../../shared-data/blogData";
export { getBlogContent } from "../../../shared-data/blogContent";

import { blogPosts } from "../../../shared-data/blogData";

export const getBlogPost = (id: string) => blogPosts.find((post) => post.id === id);

export const getFeaturedPosts = () => blogPosts.filter((post) => !post.isLegalDoc);

export const getLegalPosts = () => blogPosts.filter((post) => post.isLegalDoc);
