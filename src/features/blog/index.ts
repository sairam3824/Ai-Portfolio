export { BlogSection } from './BlogSection';
export { default as BlogsPage } from './BlogsPage';
export { BlogCard } from './BlogCard';

import { techBiweeklyDigestOct2025 } from './tech-biweekly-digest-oct-20-2025';
import { llmPoisoningHiddenThreat } from './llm-poisoning-hidden-threat';
import { ragTransformingLLMKnowledgeAccess } from './rag-transforming-llm-knowledge-access';
import { vectorDatabasesFoundationModernAI } from './vector-databases-foundation-modern-ai';
import { myCodingJourney0To3Star } from './my-coding-journey-0-to-3-star';

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

export const blogPosts: BlogPost[] = [
    myCodingJourney0To3Star,
    vectorDatabasesFoundationModernAI,
    techBiweeklyDigestOct2025,
    ragTransformingLLMKnowledgeAccess,
    llmPoisoningHiddenThreat,
];

export const getBlogPost = (id: string): BlogPost | undefined => {
    return blogPosts.find(post => post.id === id);
};

export const getFeaturedPosts = (): BlogPost[] => {
    return blogPosts.filter(post => !post.isLegalDoc);
};

export const getLegalPosts = (): BlogPost[] => {
    return blogPosts.filter(post => post.isLegalDoc);
};
