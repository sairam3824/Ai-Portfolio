export { BlogSection } from './BlogSection';
export { default as BlogsPage } from './BlogsPage';
export { default as BlogPostPage } from './BlogPostPage';
export { BlogCard } from './BlogCard';

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
    icon: string;
    iconColor: string;
    content?: string;
    isLegalDoc?: boolean;
    externalLink?: string;
}

export const blogPosts: BlogPost[] = [];

export const getBlogPost = (id: string): BlogPost | undefined => {
    return blogPosts.find(post => post.id === id);
};

export const getFeaturedPosts = (): BlogPost[] => {
    return blogPosts.filter(post => !post.isLegalDoc);
};

export const getLegalPosts = (): BlogPost[] => {
    return blogPosts.filter(post => post.isLegalDoc);
};
