export { BlogSection } from './BlogSection';
export { default as BlogsPage } from './BlogsPage';
export { default as BlogPostPage } from './BlogPostPage';
export { BlogCard } from './BlogCard';

import { techBiweeklyDigestNovMid2025 } from './tech-biweekly-digest-nov-mid-2025';
import { techBiweeklyDigestNov2025 } from './tech-biweekly-digest-nov-3-2025';
import { techBiweeklyDigestOct2025 } from './tech-biweekly-digest-oct-20-2025';
import { llmPoisoningHiddenThreat } from './llm-poisoning-hidden-threat';
import { ragTransformingLLMKnowledgeAccess } from './rag-transforming-llm-knowledge-access';
import { vectorDatabasesFoundationModernAI } from './vector-databases-foundation-modern-ai';
import { myCodingJourney0To3Star } from './my-coding-journey-0-to-3-star';
import { langchainOrchestrationForAI } from './langchain-Orchestration-For-AI';
import { awsBedrock } from './aws-bedrock';
import { llmHallucination } from './llm-Hallucination';
import { awsLambda } from './aws-lambda';
import { awsSageMaker } from './aws-sagemaker';
import { AivsGenAi } from './ai-vs-genai';
import { openAIAgentBuilder } from './openAI-Agent-Builder';
import { fineTuningLLMs } from './fineTuning-LLMs';
import { mcpServers } from './MCP-server';
import { llms } from './llm'
import { mlAlgorithms } from './ml-algorithms';
import { dlAlgorithms } from './dl-algorithms';
import { java } from './java';
import { python } from './python';
import { cpp } from './cpp';
import { n8n } from './n8n-automation';
import { modernIdes2025 } from './modren-ides';

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
    modernIdes2025,
    techBiweeklyDigestNovMid2025,
    myCodingJourney0To3Star,
    langchainOrchestrationForAI,
    n8n,
    techBiweeklyDigestNov2025,
    vectorDatabasesFoundationModernAI,
    techBiweeklyDigestOct2025,
    fineTuningLLMs,
    ragTransformingLLMKnowledgeAccess,
    llmPoisoningHiddenThreat,
    llmHallucination,
    python,
    openAIAgentBuilder,
    mcpServers,
    awsBedrock,
    awsLambda,
    java,
    cpp,
    awsSageMaker,
    llms,
    AivsGenAi,
    dlAlgorithms,
    mlAlgorithms,
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
