# RAG Knowledge Base Documents

This folder contains structured documents about **Maruri Sai Rama Linga Reddy** (Sairam) for use with Retrieval-Augmented Generation (RAG) systems.

## Purpose
These documents are designed to be ingested into a vector database (like Qdrant, Pinecone, or Chroma) to power an intelligent AI chatbot that can answer questions about Sairam's background, skills, and experience.

## Document Structure

| File | Content |
|------|---------|
| `01_personal_info.md` | Full name, aliases, professional summary, key highlights |
| `02_education.md` | B.Tech details, coursework, academic achievements |
| `03_technical_skills.md` | Programming languages, AI/ML tools, frameworks, cloud platforms |
| `04_coding_profiles.md` | Competitive programming profiles, ratings, achievements |
| `05_projects.md` | Complete project portfolio with descriptions and links |
| `06_certifications.md` | Professional certifications with verification links |
| `07_experience_expertise.md` | Years of experience, areas of expertise |
| `08_blog_interests.md` | Blog topics, areas of interest |
| `09_achievements_badges.md` | Achievements, milestones, badges earned |
| `10_contact_links.md` | All contact information and social links |

## Usage for RAG

### 1. Document Loading
Load these markdown files using a document loader (e.g., LangChain's DirectoryLoader or MarkdownLoader).

### 2. Text Splitting
Split documents into chunks for embedding. Recommended chunk size: 500-1000 characters with overlap.

### 3. Embedding
Generate embeddings using a model like:
- OpenAI text-embedding-ada-002
- Sentence Transformers
- Cohere embeddings

### 4. Vector Store
Store in a vector database:
- Qdrant (currently used)
- Pinecone
- Chroma
- FAISS

### 5. Retrieval
Use similarity search to retrieve relevant context for user queries.

## Last Updated
January 2026

## Author
Sairam Maruri (https://saiii.in)
