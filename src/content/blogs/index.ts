import { techBiweeklyDigestOct2025 } from './tech-biweekly-digest-oct-20-2025';
import { llmPoisoningHiddenThreat } from './llm-poisoning-hidden-threat';
import { ragTransformingLLMKnowledgeAccess } from './rag-transforming-llm-knowledge-access';

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

// Export all blog posts in chronological order (newest first)
export const blogPosts: BlogPost[] = [
    techBiweeklyDigestOct2025,
    llmPoisoningHiddenThreat,
    ragTransformingLLMKnowledgeAccess,
];

// Helper function to get a specific blog post by ID
export const getBlogPost = (id: string): BlogPost | undefined => {
    return blogPosts.find(post => post.id === id);
};

// Helper function to get featured posts (non-legal docs)
export const getFeaturedPosts = (): BlogPost[] => {
    return blogPosts.filter(post => !post.isLegalDoc);
};

// Helper function to get legal documents
export const getLegalPosts = (): BlogPost[] => {
    return blogPosts.filter(post => post.isLegalDoc);
};