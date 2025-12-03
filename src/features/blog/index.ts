export { BlogSection } from './BlogSection';
export { default as BlogsPage } from './BlogsPage';
export { default as BlogPostPage } from './BlogPostPage';
export { BlogCard } from './BlogCard';

import { techBiweeklyDigestNovMid2025 } from './posts/tech-biweekly-digest-nov-mid-2025';
import { techBiweeklyDigestNov2025 } from './posts/tech-biweekly-digest-nov-3-2025';
import { techBiweeklyDigestOct2025 } from './posts/tech-biweekly-digest-oct-20-2025';
import { llmPoisoningHiddenThreat } from './posts/llm-poisoning-hidden-threat';
import { ragTransformingLLMKnowledgeAccess } from './posts/rag-transforming-llm-knowledge-access';
import { vectorDatabasesFoundationModernAI } from './posts/vector-databases-foundation-modern-ai';
import { myCodingJourney0To3Star } from './posts/my-coding-journey-0-to-3-star';
import { langchainOrchestrationForAI } from './posts/langchain-Orchestration-For-AI';
import { awsBedrock } from './posts/aws-bedrock';
import { llmHallucination } from './posts/llm-Hallucination';
import { awsLambda } from './posts/aws-lambda';
import { awsSageMaker } from './posts/aws-sagemaker';
import { AivsGenAi } from './posts/ai-vs-genai';
import { openAIAgentBuilder } from './posts/openAI-Agent-Builder';
import { fineTuningLLMs } from './posts/fineTuning-LLMs';
import { mcpServers } from './posts/MCP-server';
import { llms } from './posts/llm'
import { mlAlgorithms } from './posts/ml-algorithms';
import { dlAlgorithms } from './posts/dl-algorithms';
import { java } from './posts/java';
import { python } from './posts/python';
import { cpp } from './posts/cpp';
import { n8n } from './posts/n8n-automation';
import { modernIdes2025 } from './posts/modren-ides';

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
