import { mcpServers } from './posts/MCP-server';
import { AivsGenAi } from './posts/ai-vs-genai';
import { awsBedrock } from './posts/aws-bedrock';
import { awsLambda } from './posts/aws-lambda';
import { awsSageMaker } from './posts/aws-sagemaker';
import { cpp } from './posts/cpp';
import { dlAlgorithms } from './posts/dl-algorithms';
import { fineTuningLLMs } from './posts/fineTuning-LLMs';
import { java } from './posts/java';
import { langchainOrchestrationForAI } from './posts/langchain-Orchestration-For-AI';
import { llmHallucination } from './posts/llm-Hallucination';
import { llmPoisoningHiddenThreat } from './posts/llm-poisoning-hidden-threat';
import { llms } from './posts/llm';
import { mlAlgorithms } from './posts/ml-algorithms';
import { modernIdes2025 } from './posts/modren-ides';
import { myCodingJourney0To3Star } from './posts/my-coding-journey-0-to-3-star';
import { n8n } from './posts/n8n-automation';
import { openAIAgentBuilder } from './posts/openAI-Agent-Builder';
import { python } from './posts/python';
import { ragTransformingLLMKnowledgeAccess } from './posts/rag-transforming-llm-knowledge-access';
import { biweeklyTechDec7To23 } from './posts/tech-biweekly-digest-dec-7-2025';
import { techBiweeklyDigestNov2025 } from './posts/tech-biweekly-digest-nov-3-2025';
import { techBiweeklyDigestNovMid2025 } from './posts/tech-biweekly-digest-nov-mid-2025';
import { techBiweeklyDigestOct2025 } from './posts/tech-biweekly-digest-oct-20-2025';
import { vectorDatabasesFoundationModernAI } from './posts/vector-databases-foundation-modern-ai';

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
    biweeklyTechDec7To23,
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
    return blogPosts.find((post) => post.id === id);
};

export const getFeaturedPosts = (): BlogPost[] => {
    return blogPosts.filter((post) => !post.isLegalDoc);
};

export const getLegalPosts = (): BlogPost[] => {
    return blogPosts.filter((post) => post.isLegalDoc);
};
