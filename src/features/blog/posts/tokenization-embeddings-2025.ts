import { BlogPost } from '../index';

export const tokenizationAndEmbeddings2025: BlogPost = {
  id: "tokenization-embeddings-2025",
  title: "Tokenization and Embeddings: How LLMs Turn Text Into Meaning",
  excerpt: "Behind every Large Language Model lies a quiet two-step magic trick: tokenization and embeddings. Tokenization breaks text into model-friendly units; embeddings turn those units into dense vectors that capture semantic meaning. Understanding both is essential if you're building anything serious with LLMs, from RAG systems to code assistants.",
  date: "December 20, 2025",
  readTime: "15–20 min read",
  tags: ["AI/ML", "LLM", "Tokenization", "Embeddings", "RAG", "Vector Databases"],
  icon: "Code",
  iconColor: "emerald",
  content: `<p class="mb-4 text-lg text-gray-900">Large Language Models feel magical, but under the hood they do something brutally simple: they operate on sequences of numbers. Turning your raw text into those numbers—and doing it in a way that preserves meaning—is the job of tokenization and embeddings. Get these wrong, and everything on top (RAG, agents, evaluation) quietly suffers.</p>

<p class="mb-6 text-gray-700">Tokenization decides <em>how text is chopped into tokens</em>. Embeddings decide <em>how each token or chunk is mapped into a vector space</em> where semantic similarity becomes math. Together they form the bridge between human language and neural networks, powering everything from ChatGPT prompts to vector search in production RAG systems.</p>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">From Text to Tokens: Why Tokenization Exists</h4>

<p class="mb-4 text-gray-700">Neural networks don't understand characters or words—they understand vectors. Tokenization is the process of breaking text into a sequence of discrete units (tokens) that can be mapped to integer IDs and then to vectors via embeddings. Tokens might be whole words, subwords, characters, or even raw bytes.</p>

<p class="mb-4 text-gray-700">Early NLP systems often worked at the word level, but this quickly ran into problems: huge vocabularies, out-of-vocabulary words, and difficulty handling misspellings, emojis, and multilingual text. Modern LLMs instead rely on <strong>subword tokenization</strong>, which decomposes words into smaller pieces that can recombine to represent almost anything you type.</p>

<ul class="mb-6 text-gray-700 list-disc list-inside space-y-2">
  <li><strong>Goal:</strong> Represent arbitrary text as a manageable sequence of tokens from a finite vocabulary (usually ~30k–100k entries).</li>
  <li><strong>Constraint:</strong> Smaller vocabularies reduce model size and memory, but too small a vocabulary explodes sequence length and cost.</li>
  <li><strong>Trade‑off:</strong> Subword tokenization (like BPE, WordPiece, SentencePiece) balances vocabulary size and expressivity.</li>
</ul>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Subword Tokenization: BPE, WordPiece, and Friends</h4>

<p class="mb-4 text-gray-700">The dominant tokenization strategy for LLMs today is subword tokenization, with algorithms like Byte Pair Encoding (BPE), WordPiece, and SentencePiece. They all share a common idea: instead of assigning a unique token to every word, learn a set of frequently occurring subword units that can compose most words efficiently.</p>

<p class="mb-4 text-gray-700">BPE, originally a data compression algorithm, was adapted to NLP to iteratively merge the most frequent pairs of symbols (starting from characters) until a target vocabulary size is reached. This creates tokens like "trans", "form", and "er" that can combine into "transformer", and similarly decompose rare or unseen words without ever being truly out-of-vocabulary.</p>

<h5 class="text-lg font-semibold text-gray-900 mb-3 mt-6">How BPE Works (Conceptual)</h5>

<ol class="mb-4 text-gray-700 list-decimal list-inside space-y-1">
  <li>Start with a corpus and a base alphabet (characters or bytes).</li>
  <li>Represent each word as a sequence of base symbols.</li>
  <li>Count all adjacent symbol pairs in the corpus.</li>
  <li>Merge the most frequent pair into a new symbol (subword token).</li>
  <li>Repeat steps 3–4 until you reach the desired vocabulary size.</li>
</ol>

<p class="mb-6 text-gray-700">The result is a vocabulary where common words might be single tokens, while rarer words are sequences of subwords. This makes tokenization robust to typos, new jargon, and multilingual text—critical for general-purpose LLMs.</p>

<h5 class="text-lg font-semibold text-gray-900 mb-3 mt-6">Code: Inspecting Tokenization with Hugging Face</h5>

<p class="mb-4 text-gray-700">You don't usually implement BPE from scratch in production; you use pretrained tokenizers from model libraries. Let's inspect how different words and languages tokenize using a GPT‑style tokenizer via Hugging Face Transformers.</p>

<pre class="mb-6 bg-gray-900 text-gray-100 text-sm rounded-lg p-4 overflow-x-auto"><code class="language-python"># pip install transformers tiktoken
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("gpt2")

texts = [
    "Tokenization and embeddings power modern LLMs.",
    "Tokenisation and embeddings power modern LLMs.",   # British spelling
    "Transformers are amazing 🤯",
    "टोकनाइज़ेशन बहुत महत्वपूर्ण है",                     # Hindi
]

for text in texts:
    tokens = tokenizer.tokenize(text)
    ids = tokenizer.encode(text)
    print("TEXT:", text)
    print("TOKENS:", tokens)
    print("NUM TOKENS:", len(tokens))
    print("IDS:", ids)
    print("-" * 60)</code></pre>

<p class="mb-6 text-gray-700">Running this script makes tokenization behavior visible: emojis become separate tokens, unusual spellings may break into more subwords, and non‑Latin scripts are still representable via learned subword units. This is why "token count" is often a better proxy for cost than character or word count.</p>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">From Tokens to Vectors: What Embeddings Really Are</h4>

<p class="mb-4 text-gray-700">Once text is tokenized, each token ID is mapped to a dense vector—an embedding. Embeddings are learned numeric representations that place semantically related items close together in high‑dimensional space. Similar words, sentences, or documents have embeddings with high cosine similarity.</p>

<p class="mb-4 text-gray-700">In LLMs, there are two common types of embeddings: <strong>input embeddings</strong>, used internally by the model as the first layer, and <strong>task embeddings</strong>, produced by dedicated models for tasks like semantic search, clustering, recommendation, or RAG. Modern embedding models can map text into vectors with hundreds or thousands of dimensions.</p>

<ul class="mb-6 text-gray-700 list-disc list-inside space-y-2">
  <li><strong>Dense:</strong> Every dimension carries information, unlike one‑hot vectors where almost everything is zero.</li>
  <li><strong>Distributed:</strong> Meaning is spread across dimensions rather than stored in a single component.</li>
  <li><strong>Semantic:</strong> Geometry encodes relationships: similar items cluster; analogies become vector arithmetic.</li>
</ul>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Modern Embedding Models: Dimensions, Cost, and Trade‑offs</h4>

<p class="mb-4 text-gray-700">In 2025, a typical production embedding model might produce vectors of 128–1536 dimensions, depending on latency, memory, and quality targets. OpenAI's <code>text-embedding-3-small</code>, for example, outputs 1536‑dimensional vectors optimized for semantic search and RAG, while larger models can go up to 3072 dimensions or more.</p>

<p class="mb-4 text-gray-700">More dimensions are not always better. Higher dimensionality improves expressiveness but increases memory usage, index size, and retrieval latency. Many teams aim for a "knee point" in the quality–cost curve—often around 512–1024 dimensions for general RAG and 128–256 for very high QPS, latency‑sensitive workloads.</p>

<ul class="mb-6 text-gray-700 list-disc list-inside space-y-2">
  <li>128–256 dims: real‑time search, mobile, or edge; strong speed but less nuance.</li>
  <li>512 dims: balanced recall/precision for general semantic search and RAG.</li>
  <li>1536+ dims: maximum semantic detail, good for complex enterprise corpora at moderate scale.</li>
</ul>

<h5 class="text-lg font-semibold text-gray-900 mb-3 mt-6">Code: Computing Embeddings with OpenAI</h5>

<p class="mb-4 text-gray-700">Here's a minimal Python example that calls an embedding API (using the OpenAI format as commonly documented) and computes pairwise cosine similarity between texts. Adapt the client as needed for your stack.</p>

<pre class="mb-6 bg-gray-900 text-gray-100 text-sm rounded-lg p-4 overflow-x-auto"><code class="language-python">import numpy as np
from openai import OpenAI

client = OpenAI(api_key="YOUR_API_KEY")

def get_embedding(text: str, model: str = "text-embedding-3-small"):
    response = client.embeddings.create(
        model=model,
        input=text,
    )
    return np.array(response.data[0].embedding, dtype=np.float32)

def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))

texts = [
    "Tokenization and embeddings power modern language models.",
    "Modern LLMs rely on good tokenization and dense vector embeddings.",
    "I am planning a vacation in the mountains.",
]

embs = [get_embedding(t) for t in texts]

print("Similarity(0,1):", cosine_similarity(embs[0], embs[1]))
print("Similarity(0,2):", cosine_similarity(embs[0], embs[2]))</code></pre>

<p class="mb-6 text-gray-700">You should see the first two sentences (same topic) yield much higher similarity than the third (different topic). That's the core of semantic search, recommendations, and retrieval‑augmented generation: geometry as meaning.</p>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Putting It Together: Tokenization + Embeddings in RAG</h4>

<p class="mb-4 text-gray-700">In a typical RAG system, tokenization and embeddings are used twice: once offline during indexing and once online at query time. The same tokenization and embedding model must be used in both phases for the vector space to stay consistent.</p>

<p class="mb-4 text-gray-700">Long documents are chunked into passages, each passage is tokenized and embedded, and those vectors are stored in a vector database (FAISS, Milvus, Pinecone, etc.). At query time, the user question is embedded, and a similarity search retrieves the most relevant chunks, which are then fed (as text) back into the LLM.</p>

<h5 class="text-lg font-semibold text-gray-900 mb-3 mt-6">Code: Tiny RAG Skeleton with Embeddings</h5>

<p class="mb-4 text-gray-700">The following minimal example shows how tokenization and embeddings plug into a toy RAG pipeline using in‑memory vectors and cosine similarity. In production you'd replace this with an ANN index.</p>

<pre class="mb-6 bg-gray-900 text-gray-100 text-sm rounded-lg p-4 overflow-x-auto"><code class="language-python">import numpy as np
from openai import OpenAI

client = OpenAI(api_key="YOUR_API_KEY")
MODEL = "text-embedding-3-small"

documents = [
    "Docker packages applications into containers so they run consistently across environments.",
    "Kubernetes orchestrates containers across a cluster, handling scaling and self-healing.",
    "RAG systems combine LLMs with vector search to ground answers in external knowledge.",
]

def embed(texts):
    resp = client.embeddings.create(model=MODEL, input=texts)
    return [np.array(d.embedding, dtype=np.float32) for d in resp.data]

doc_embeddings = embed(documents)

def search(query, k=2):
    q_emb = embed([query])[0]
    sims = [float(q_emb @ d / (np.linalg.norm(q_emb) * np.linalg.norm(d))) 
            for d in doc_embeddings]
    top_indices = np.argsort(sims)[::-1][:k]
    return [(documents[i], sims[i]) for i in top_indices]

query = "How do I orchestrate containers in production?"
results = search(query, k=2)

for doc, score in results:
    print(f"Score: {score:.3f} | Doc: {doc}")</code></pre>

<p class="mb-6 text-gray-700">Even with this tiny example, the query should rank the Kubernetes description highly, illustrating how embeddings capture meaning beyond exact keyword matches—a core advantage over traditional lexical search.</p>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Practical Pitfalls: Tokenization Drift, Truncation, and Code</h4>

<p class="mb-4 text-gray-700">Tokenization and embeddings introduce subtle failure modes. One is <strong>tokenization drift</strong>: using different tokenization or embedding models between indexing and retrieval. Even minor changes can distort distances in vector space and silently degrade recall.</p>

<p class="mb-4 text-gray-700">Another issue is truncation. Because models have context limits measured in tokens, long prompts or documents may be cut off mid‑sentence. Poor chunking strategies can break semantic units, leading to embeddings that blend unrelated content. Recent work even shows that code can be tokenized inconsistently depending on whitespace and naming, impacting model behavior.</p>

<ul class="mb-6 text-gray-700 list-disc list-inside space-y-2">
  <li>Always use the same embedding model and tokenizer for both indexing and querying.</li>
  <li>Design chunking around semantic or structural boundaries (sections, headings, function definitions).</li>
  <li>Monitor average token counts and truncation rates in production logs; adjust chunk size accordingly.</li>
</ul>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Design Recommendations: Choosing Tokenizers and Embeddings</h4>

<p class="mb-4 text-gray-700">Choosing a tokenizer and embedding model is ultimately an engineering decision that balances interoperability, quality, and cost. For most LLM applications, adopting the tokenizer that ships with your base model is the safest option; for embeddings, it's common to use a specialized model optimized for retrieval and clustering.</p>

<p class="mb-4 text-gray-700">In practice, teams often start with a mid‑sized, cost‑effective embedding model (like a 512–1536‑dimensional text encoder), evaluate retrieval quality on a validation set, and then tune vector dimension, index type, and chunking strategy. The best setups treat embeddings as a first‑class part of the system, not an afterthought hidden in a utility function.</p>

<ul class="mb-6 text-gray-700 list-disc list-inside space-y-2">
  <li>Prefer widely used tokenizers and embedding APIs to avoid tooling lock‑in.</li>
  <li>Right‑size dimensions for your workload instead of defaulting to the maximum.</li>
  <li>Continuously evaluate retrieval quality when your corpus, chunking, or embedding model changes.</li>
</ul>

<p class="mb-6 text-gray-700">Tokenization and embeddings may feel like "plumbing," but they are the lens through which your LLM sees the world. Investing a bit of time to understand and design them well pays compound interest across every downstream feature—search, RAG, agents, and analytics.</p>

<!-- Collapsible Sources Section -->
<details class="mb-8 border border-gray-200 rounded-lg">
  <summary class="px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 font-medium text-gray-900 rounded-t-lg">Sources & References</summary>
  <div class="p-4 space-y-3">
    <div class="grid gap-3">
      <a href="https://seantrott.substack.com/p/tokenization-in-large-language-models" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">Tokenization in Large Language Models, Explained | Sean Trott</a>
      <a href="https://www.openxcell.com/blog/llm-tokenization/" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">LLM Tokenization: Techniques, Examples & Use Cases | OpenXcell</a>
      <a href="https://datasciencedojo.com/blog/byte-pair-encoding/" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">Byte Pair Encoding: The Secret Sauce of Modern NLP Tokenization | DataScienceDojo</a>
      <a href="https://arxiv.org/html/2510.14972v1" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">TokDrift: When LLM Speaks in Subwords but Code Speaks in Grammar | arXiv</a>
      <a href="https://platform.openai.com/docs/guides/embeddings" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">Vector Embeddings Guide | OpenAI</a>
      <a href="https://platform.openai.com/docs/models/text-embedding-3-small" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">text-embedding-3-small Model Card | OpenAI</a>
      <a href="https://zilliz.com/ai-models/text-embedding-3-small" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">The Guide to text-embedding-3-small | Zilliz</a>
      <a href="https://artsmart.ai/blog/top-embedding-models-in-2025/" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">Top Embedding Models 2025: Complete Guide | Artsmart.ai</a>
      <a href="https://www.meilisearch.com/blog/what-are-vector-embeddings" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">What Are Vector Embeddings? A Complete Guide | Meilisearch</a>
      <a href="https://indiaai.gov.in/article/exploring-the-depths-of-vector-embeddings" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">Exploring the Depths of Vector Embeddings | IndiaAI</a>
      <a href="https://learn.microsoft.com/en-us/dotnet/ai/conceptual/understanding-tokens" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">Understanding Tokens | Microsoft Learn</a>
      <a href="https://fast.ai/posts/2025-10-16-karpathy-tokenizers.html" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">Let's Build the GPT Tokenizer | fast.ai</a>
    </div>
  </div>
</details>

<!-- Blue Engagement Box -->
<div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mt-8">
  <div class="space-y-4">
    <p class="text-gray-700 text-base leading-relaxed">Want a follow-up deep dive on chunking strategies for RAG or a comparison of different embedding models in practice? Share your stack and use case—those details shape which trade-offs matter most.</p>
    <div class="space-y-2">
      <p class="text-gray-700">Until next time,</p>
      <p class="text-gray-900 font-medium italic">Sairam Maruri</p>
    </div>
  </div>
</div>

<div class="mt-6 text-sm text-gray-500">
  <p>Note: This article includes AI-assisted writing and manual curation. Use at your own risk.</p>
</div>`
};