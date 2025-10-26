import { BookOpen, Calendar, ExternalLink, Eye, X, Share2, Link as LinkIcon, CheckCircle2, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const openModal = (postId: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    setSelectedPost(postId);
    document.body.style.overflow = "hidden"; // lock scroll
  };

  const closeModal = () => {
    setSelectedPost(null);
    document.body.style.overflow = ""; // restore scroll
    // restore focus to the last focused trigger
    setTimeout(() => lastFocusedRef.current?.focus?.(), 0);
  };

  // Handle ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPost !== null) closeModal();
    };
    if (selectedPost !== null) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selectedPost]);

  // Focus the close button when modal opens (basic focus management)
  useEffect(() => {
    if (selectedPost !== null) {
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }
  }, [selectedPost]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://saiii.in";
  const shareTitle = "Tech Weekly Digest: Week of October 20, 2025";

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: shareTitle, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch (_) {
      /* ignore */
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) {}
  };

  return (
    <div className="animate-fade-in space-y-6">
      <h2 className="text-3xl font-bold text-foreground text-center select-none pointer-events-none focus:outline-none">
        Blog
      </h2>

      <div className="space-y-6">
        {/* Tech Weekly Digest */}
        <article className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="p-3 bg-green-50 rounded-full">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Tech Weekly Digest: Week of October 20, 2025
              </h3>
              <p className="text-gray-600 mb-3 leading-relaxed">
                Welcome to the inaugural edition of Tech Weekly Digest—your Sunday morning companion for staying current with the rapidly evolving world of GenAI, cloud computing, and emerging technologies.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>October 20, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <span>15 min read</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">AI/ML</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">OpenAI</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">Cloud Computing</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Weekly Digest</span>
              </div>

              <div className="flex items-center gap-4 flex-wrap mt-4">
                <button
                  onClick={() => openModal(1)}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                  aria-haspopup="dialog"
                  aria-controls="digest-modal"
                >
                  Read More <ExternalLink className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNativeShare}
                  className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button
                  onClick={copyLink}
                  className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
                >
                  <LinkIcon className="w-4 h-4" /> {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Global AI Content Disclaimer (expanded) */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mt-8">
        <p className="text-amber-900 text-sm text-center">
          <strong>Disclaimer:</strong> These articles includes curated industry updates and AI-assisted writing. Information is accurate to the best of our review as of the published date, but may change as technologies evolve. Please verify technical or business decisions independently. External links may lead to third-party content for which we are not responsible.
        </p>
      </div>

      {/* Legal footer links */}
      <footer className="flex items-center justify-center gap-6 text-sm text-gray-600">
        <a className="hover:text-gray-900 underline underline-offset-4" href="/privacy">Privacy Policy</a>
        <a className="hover:text-gray-900 underline underline-offset-4" href="/terms">Terms of Use</a>
      </footer>

      {/* Subscribe CTA */}
      <section aria-labelledby="subscribe-title" className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 mt-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <h4 id="subscribe-title" className="text-lg font-semibold text-gray-900">Subscribe to the Weekly Digest</h4>
            <p className="text-gray-700 text-sm mb-3">Get one email every Sunday with GenAI, cloud, and dev‑tools highlights. No spam, unsubscribe anytime.</p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks! You’re on the list.");
              }}
            >
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="you@example.com"
                className="w-full sm:w-auto flex-1 rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
                <CheckCircle2 className="w-4 h-4" /> Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedPost && (
        <div
          id="digest-modal-backdrop"
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
          aria-hidden="true"
        >
          <div
            id="digest-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="digest-title"
            aria-describedby="digest-content"
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-gray-200 p-4 sm:p-6 flex justify-between items-center rounded-t-2xl">
              <h3 id="digest-title" className="text-2xl font-bold text-gray-900">
                Tech Weekly Digest: Week of October 20, 2025
              </h3>
              <button
                ref={closeBtnRef}
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div id="digest-content" className="p-6">
              <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                <p className="mb-4 text-lg text-gray-900">
                  Welcome to the inaugural edition of Tech Weekly Digest—your Sunday morning companion for staying current with the rapidly evolving world of GenAI, cloud computing, and emerging technologies.
                </p>

                <p className="mb-6 text-gray-700">
                  Every week, I'll curate the most significant updates, new releases, and framework documentation that matter to engineers, developers, and tech enthusiasts. This past week has been particularly eventful, with groundbreaking releases from OpenAI, major updates to developer frameworks, and significant announcements from cloud providers. Let's dive into what shaped the tech landscape this week.
                </p>

                <h4 className="text-xl font-semibold text-gray-900 mb-4 mt-8">OpenAI's ChatGPT Atlas: The AI-Native Browser That's Sparking Debate</h4>
                <p className="mb-4 text-gray-700">
                  On October 21, 2025, OpenAI launched ChatGPT Atlas, marking one of the most ambitious moves in the AI browser wars. CEO Sam Altman positioned it as "a rare once-a-decade opportunity to rethink what a browser can be," but the question remains: is it revolutionary or just incremental evolution?
                </p>

                <p className="mb-3 font-semibold text-lg text-gray-900">What Makes Atlas Different?</p>
                <p className="mb-4 text-gray-700">
                  Atlas isn't just another browser with AI bolted on—it's built from the ground up with ChatGPT as its core. The key differentiator is eliminating the tedious copy‑paste workflow between browser tabs and AI tools. Instead, you get an integrated sidebar that automatically understands context without manual information sharing.
                </p>

                <p className="mb-3 font-semibold text-lg text-gray-900">Key Features Worth Noting:</p>
                <ul className="list-disc list-inside mb-6 space-y-3 pl-4 text-gray-700">
                  <li><strong className="text-gray-900">Agent Mode</strong> (Plus/Pro subscribers): Autonomous task execution across websites—ChatGPT can navigate pages, fill forms, and complete multi‑step workflows on your behalf. During the launch demo, OpenAI showcased Agent Mode autonomously adding grocery items to an Instacart cart and assigning tasks from Google Docs.</li>
                  <li><strong className="text-gray-900">Browser Memories</strong>: Opt‑in feature that remembers key details from your browsing sessions to provide continuity.</li>
                  <li><strong className="text-gray-900">Cursor Chat</strong>: Inline text enhancement anywhere in the browser, letting you rewrite emails or content without switching contexts.</li>
                  <li><strong className="text-gray-900">Natural Language Commands</strong>: Execute tasks like "organize my tabs" or "find that recipe I looked at last week" conversationally.</li>
                </ul>

                <p className="mb-4 font-semibold text-lg text-gray-900">The Reality Check:</p>
                <p className="mb-6 text-gray-700">
                  While technically solid, Atlas faces a crowded market without a clear competitive moat. Chrome, Edge with Copilot, Opera, and others already offer AI features. The fundamental question of adoption remains unanswered—will users switch from their established browsers? Currently, Atlas is macOS‑only, with Windows, iOS, and Android versions coming soon.
                </p>

                <h4 className="text-xl font-semibold text-gray-900 mb-4 mt-8">OpenAI API & Model Updates: GPT‑5 Family Arrives</h4>
                <p className="mb-4 text-gray-700">At DevDay 2025 (early October), OpenAI unveiled significant API updates that developers should know about:</p>

                <p className="mb-3 font-semibold text-lg text-gray-900">GPT‑5 Model Family:</p>
                <ul className="list-disc list-inside mb-6 space-y-3 pl-4 text-gray-700">
                  <li><strong className="text-gray-900">GPT‑5</strong>: The flagship powerhouse at $1.25 per million input tokens and $10 for output tokens, designed for high‑performance applications requiring complex reasoning.</li>
                  <li><strong className="text-gray-900">GPT‑5 mini</strong>: A balanced option at $0.25 (input) and $2.00 (output), offering 80% cost reduction for input compared to GPT‑5—excellent for well‑defined agentic workflows.</li>
                  <li><strong className="text-gray-900">GPT‑5 nano</strong>: The budget champion at $0.05 (input) and $0.40 (output) per million tokens, ideal for simple summarization and classification tasks.</li>
                  <li><strong className="text-gray-900">GPT‑5 Pro</strong>: Introduced specifically for finance, legal, and healthcare industries that need "high accuracy and depth of reasoning".</li>
                </ul>

                <p className="mb-3 font-semibold text-lg text-gray-900">Voice Model Updates:</p>
                <p className="mb-6 text-gray-700">
                  OpenAI launched gpt‑realtime mini, a smaller, cheaper voice model that's 70% less expensive than the previous advanced voice model while maintaining the same voice quality and expressiveness. This addresses the growing importance of voice as a primary AI interaction method.
                </p>

                <h4 className="text-xl font-semibold text-gray-900 mb-4 mt-8">LangChain & LangGraph 1.0: Production‑Ready Agent Development</h4>
                <p className="mb-4 text-gray-700">
                  October 2025 marks a pivotal moment for the agent development community with LangChain and LangGraph officially reaching 1.0 stable release.
                </p>

                <p className="mb-3 font-semibold text-lg text-gray-900">What Changed?</p>
                <p className="mb-4 text-gray-700">
                  LangChain is no longer "just chains"—it's been completely rewritten as a platform centered on production‑ready agents. The team merged LangChain's past and future by making the framework opinionated, focused, and powered by LangGraph's runtime.
                </p>

                <p className="mb-3 font-semibold text-lg text-gray-900">Major Updates:</p>
                $1

                <div className="mt-6">
                  {/* Signature image — place file in /public */}
                  <img
                    src="/sairam-signoff.png"
                    alt="Until next Sunday — Sairam Maruri"
                    className="w-full rounded-xl border border-gray-200 shadow-sm"
                    loading="lazy"
                  />
                </div>

                <p className="mb-3 font-semibold text-lg text-gray-900">LangChain's Unicorn Status:</p>
                <p className="mb-6 text-gray-700">
                  On October 21, LangChain announced a $125 million funding round at a $1.25 billion valuation, officially becoming a unicorn. The round was led by IVP, with participation from new investors CapitalG and Sapphire Ventures, plus existing investors Sequoia, Benchmark, and Amplify.
                </p>

                <h4 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Anthropic's Claude Updates: Skills and Life Sciences Focus</h4>
                <p className="mb-4 text-gray-700">Anthropic made significant announcements this month focused on extending Claude's capabilities for specific workflows and industries.</p>

                <p className="mb-3 font-semibold text-lg text-gray-900">Agent Skills Launch (October 16, 2025):</p>
                <p className="mb-6 text-gray-700">
                  Anthropic introduced Agent Skills, a new way to extend Claude's capabilities. Skills are organized folders of prompts, guidelines, and examples that teach Claude how to perform specific tasks consistently. Early partners include Box, Notion, and Canva.
                </p>

                <h4 className="text-xl font-semibold text-gray-900 mb-4 mt-8">What This Means for Developers</h4>
                <p className="mb-4 text-gray-700">This week's updates reflect several important trends:</p>
                <ol className="list-decimal list-inside mb-6 space-y-3 pl-4 text-gray-700">
                  <li><strong className="text-gray-900">The Agent Era is Accelerating</strong>: From LangChain 1.0 to Anthropic Skills to Gemini Computer Use, every major player is doubling down on production‑ready agent frameworks.</li>
                  <li><strong className="text-gray-900">Specialization Over Generalization</strong>: We're seeing model families (GPT‑5, GPT‑5 mini, GPT‑5 nano) and industry‑specific versions rather than one‑size‑fits‑all solutions.</li>
                  <li><strong className="text-gray-900">Infrastructure Matters</strong>: The Anthropic‑Google Cloud TPU deal and AWS's capacity management tools show that scaling AI requires serious infrastructure investment.</li>
                  <li><strong className="text-gray-900">Cost Optimization is Critical</strong>: New budget‑friendly models and 70% cost reductions in voice models reflect the market's demand for economical AI options.</li>
                  <li><strong className="text-gray-900">Security & Compliance are Non‑Negotiable</strong>: Enterprise AI adoption requires robust governance frameworks.</li>
                </ol>

                <h4 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Looking Ahead</h4>
                <p className="mb-4 text-gray-700">
                  As we close out October 2025, the AI landscape continues evolving at breakneck speed. The convergence of powerful models, production‑ready frameworks, and robust infrastructure suggests we're moving from AI experimentation to AI operationalization.
                </p>

                {/* Sources accordion */}
                
                <details className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <summary className="cursor-pointer font-semibold text-gray-900">Sources & References</summary>
                  <div className="mt-3 space-y-4 text-gray-700">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">AI & GenAI Updates</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li><a className="text-blue-700 hover:underline" href="https://openai.com/news" target="_blank" rel="noopener noreferrer">OpenAI Newsroom</a> — Official announcements, API updates, and model release notes (GPT‑5, Sora, Atlas).</li>
                        <li><a className="text-blue-700 hover:underline" href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes" target="_blank" rel="noopener noreferrer">OpenAI Release Notes</a> — Detailed ChatGPT product and API version histories.</li>
                        <li><a className="text-blue-700 hover:underline" href="https://changelog.langchain.com" target="_blank" rel="noopener noreferrer">LangChain Changelog</a> — LangChain & LangGraph release updates.</li>
                        <li><a className="text-blue-700 hover:underline" href="https://www.anthropic.com/news" target="_blank" rel="noopener noreferrer">Anthropic Newsroom</a> — Claude updates, Agent Skills, partnerships.</li>
                        <li><a className="text-blue-700 hover:underline" href="https://ai.google.dev/gemini-api/docs/changelog" target="_blank" rel="noopener noreferrer">Google Gemini Developer Docs</a> — Gemini API release notes.</li>
                        <li><a className="text-blue-700 hover:underline" href="https://blog.google/products/gemini" target="_blank" rel="noopener noreferrer">Gemini Blog (Google DeepMind)</a> — Product release blogs.</li>
                        <li><a className="text-blue-700 hover:underline" href="https://docs.claude.com/en/release-notes/overview" target="_blank" rel="noopener noreferrer">Anthropic Claude Developer Docs</a> — Release notes.</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Cloud & Infrastructure</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li><a className="text-blue-700 hover:underline" href="https://aws.amazon.com/blogs/aws" target="_blank" rel="noopener noreferrer">AWS News Blog</a> — Service launches and updates.</li>
                        <li><a className="text-blue-700 hover:underline" href="https://aws.amazon.com/blogs/training-and-certification" target="_blank" rel="noopener noreferrer">AWS Training & Certification Updates</a></li>
                        <li><a className="text-blue-700 hover:underline" href="https://cloud.google.com/vertex-ai/generative-ai/docs/release-notes" target="_blank" rel="noopener noreferrer">Google Cloud Vertex AI Release Notes</a></li>
                        <li><a className="text-blue-700 hover:underline" href="https://learn.microsoft.com/en-us/azure/ai-foundry/whats-new-azure-ai-foundry" target="_blank" rel="noopener noreferrer">Azure AI Foundry — What’s New</a></li>
                        <li><a className="text-blue-700 hover:underline" href="https://learn.microsoft.com/en-us/azure/ai-services/whats-new-ai-services" target="_blank" rel="noopener noreferrer">Azure AI Services — Updates</a></li>
                        <li><a className="text-blue-700 hover:underline" href="https://cloudsecurityalliance.org/star" target="_blank" rel="noopener noreferrer">Cloud Security Alliance STAR for AI</a></li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Technical News & Trend Sources</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li><a className="text-blue-700 hover:underline" href="https://techcrunch.com/tag/ai/" target="_blank" rel="noopener noreferrer">TechCrunch — AI</a></li>
                        <li><a className="text-blue-700 hover:underline" href="https://www.fastcompany.com/technology" target="_blank" rel="noopener noreferrer">Fast Company — Tech & AI</a></li>
                        <li><a className="text-blue-700 hover:underline" href="https://www.theverge.com/artificial-intelligence" target="_blank" rel="noopener noreferrer">The Verge — AI</a></li>
                        <li><a className="text-blue-700 hover:underline" href="https://www.crescendo.ai/news/latest-ai-news-and-updates" target="_blank" rel="noopener noreferrer">Crescendo AI Daily</a></li>
                        <li><a className="text-blue-700 hover:underline" href="https://genaipm.com/audio/daily-brief" target="_blank" rel="noopener noreferrer">GenAI PM — Audio Daily Briefs</a></li>
                        <li><a className="text-blue-700 hover:underline" href="https://www.perplexity.ai/hub" target="_blank" rel="noopener noreferrer">Perplexity Hub Blog</a></li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Developer Ecosystem Updates</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li><a className="text-blue-700 hover:underline" href="https://github.com/langchain-ai/langchain/releases" target="_blank" rel="noopener noreferrer">LangChain GitHub Releases</a></li>
                        <li><a className="text-blue-700 hover:underline" href="https://community.openai.com" target="_blank" rel="noopener noreferrer">OpenAI Developer Forum</a></li>
                        <li><a className="text-blue-700 hover:underline" href="https://community.anthropic.com" target="_blank" rel="noopener noreferrer">Anthropic Community Hub</a></li>
                        <li><a className="text-blue-700 hover:underline" href="https://cloud.google.com/blog/topics/developers-practitioners" target="_blank" rel="noopener noreferrer">Google Cloud Developer News</a></li>
                        <li><a className="text-blue-700 hover:underline" href="https://devblogs.microsoft.com" target="_blank" rel="noopener noreferrer">Microsoft Developer Blog</a></li>
                      </ul>
                    </div>
                  </div>
                </details>

                <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mt-6 mb-6">
                  <p className="text-gray-800 mb-4">
                    <strong>What updates are you most excited about? What topics should I cover in next week's digest?</strong> Feel free to share your thoughts—this is a conversation, not a monologue.
                  </p>
                  <p className="text-gray-800">
                    Until next time,<br />
                    <em className="font-semibold">Sairam Maruri</em>
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-6">
                  Note: This article includes AI‑assisted writing and manual curation. Use at your own risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
