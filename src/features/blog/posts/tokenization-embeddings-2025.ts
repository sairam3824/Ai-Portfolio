export const tokenizationAndEmbeddings2025 = {
  id: "tokenization-embeddings-2025",
  title: "Tokenization and Embeddings: How LLMs Turn Text Into Meaning",
  excerpt:
    "Behind every Large Language Model lies a quiet two-step magic trick: tokenization and embeddings. Tokenization breaks text into model-friendly units; embeddings turn those units into dense vectors that capture semantic meaning. Understanding both is essential if you're building anything serious with LLMs, from RAG systems to code assistants.",
  date: "December 20, 2025",
  readTime: "15–20 min read",
  tags: ["AI/ML", "LLM", "Tokenization", "Embeddings", "RAG", "Vector Databases"],
  icon: "Code",
  iconColor: "emerald",
  content: `
<p class="mb-4 text-lg text-gray-900">
  Large Language Models feel magical, but under the hood they do something brutally simple:
  they operate on sequences of numbers. Turning your raw text into those numbers—and doing
  it in a way that preserves meaning—is the job of tokenization and embeddings. Get these
  wrong, and everything on top (RAG, agents, evaluation) quietly suffers.
</p>

<p class="mb-6 text-gray-700">
  Tokenization decides <em>how text is chopped into tokens</em>. Embeddings decide
  <em>how each token or chunk is mapped into a vector space</em> where semantic similarity
  becomes math. Together they form the bridge between human language and neural networks,
  powering everything from ChatGPT prompts to vector search in production RAG systems.
</p>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">
  From Text to Tokens: Why Tokenization Exists
</h4>

<p class="mb-4 text-gray-700">
  Neural networks don't understand characters or words—they understand vectors.
  Tokenization is the process of breaking text into a sequence of discrete units (tokens)
  that can be mapped to integer IDs and then to vectors via embeddings.
</p>

<p class="mb-4 text-gray-700">
  Early NLP systems often worked at the word level, but this quickly ran into problems:
  huge vocabularies, out-of-vocabulary words, and difficulty handling misspellings,
  emojis, and multilingual text. Modern LLMs instead rely on
  <strong>subword tokenization</strong>.
</p>

<ul class="mb-6 text-gray-700 list-disc list-inside space-y-2">
  <li><strong>Goal:</strong> Represent arbitrary text as a manageable sequence of tokens.</li>
  <li><strong>Constraint:</strong> Smaller vocabularies reduce model size but increase length.</li>
  <li><strong>Trade-off:</strong> Subword tokenization balances size and expressivity.</li>
</ul>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">
  Subword Tokenization: BPE, WordPiece, and Friends
</h4>

<p class="mb-4 text-gray-700">
  The dominant tokenization strategy for LLMs today is subword tokenization, with
  algorithms like Byte Pair Encoding (BPE), WordPiece, and SentencePiece.
</p>

<h5 class="text-lg font-semibold text-gray-900 mb-3 mt-6">
  How BPE Works (Conceptual)
</h5>

<ol class="mb-4 text-gray-700 list-decimal list-inside space-y-1">
  <li>Start with a corpus and base alphabet.</li>
  <li>Represent words as symbol sequences.</li>
  <li>Count adjacent symbol pairs.</li>
  <li>Merge the most frequent pair.</li>
  <li>Repeat until vocabulary size is reached.</li>
</ol>

<p class="mb-6 text-gray-700">
  This makes tokenization robust to typos, new jargon, and multilingual text.
</p>

<h5 class="text-lg font-semibold text-gray-900 mb-3 mt-6">
  Code: Inspecting Tokenization with Hugging Face
</h5>

<pre class="mb-6 bg-gray-900 text-gray-100 text-sm rounded-lg p-4 overflow-x-auto">
<code class="language-python">
# pip install transformers tiktoken
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("gpt2")

texts = [
    "Tokenization and embeddings power modern LLMs.",
    "Tokenisation and embeddings power modern LLMs.",
    "Transformers are amazing 🤯",
]

for text in texts:
    tokens = tokenizer.tokenize(text)
    ids = tokenizer.encode(text)
    print(text, len(tokens))
</code>
</pre>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">
  From Tokens to Vectors: What Embeddings Really Are
</h4>

<p class="mb-4 text-gray-700">
  Once text is tokenized, each token ID is mapped to a dense vector—an embedding.
  Embeddings place semantically related items close together in vector space.
</p>

<ul class="mb-6 text-gray-700 list-disc list-inside space-y-2">
  <li><strong>Dense:</strong> Every dimension carries information.</li>
  <li><strong>Distributed:</strong> Meaning is spread across dimensions.</li>
  <li><strong>Semantic:</strong> Geometry encodes relationships.</li>
</ul>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">
  Putting It Together: Tokenization + Embeddings in RAG
</h4>

<p class="mb-6 text-gray-700">
  Tokenization and embeddings are used twice in RAG: once during indexing and once
  at query time. Consistency between both phases is critical.
</p>

<!-- Dark Callout Box (Replaces Emerald Box) -->
<div class="mt-10 border border-gray-700 rounded-xl bg-gray-800 p-6">
  <p class="text-gray-200 text-base leading-relaxed">
    Which of these late-November developments is most relevant to your roadmap—
    <span class="font-medium">new models, infra deals, or agentic workflows</span>?
    Reply with your stack and constraints, and upcoming digests can dive deeper
    into concrete patterns tailored to your use cases.
  </p>

  <div class="mt-6 space-y-1">
    <p class="text-gray-400">Until next time,</p>
    <p class="text-gray-100 font-medium italic">Sairam Maruri</p>
  </div>
</div>

<div class="mt-6 text-sm text-gray-500">
  <p>
    Note: This article includes AI-assisted writing and manual curation.
    Use at your own risk.
  </p>
</div>
`
};
