---
name: version2-blog-writer
description: Generates new AI/tech blog posts for the Version2 portfolio, using web research and matching the existing blog tone, structure, HTML/Tailwind markup, and TypeScript wiring in the blog feature. Use when the user asks to create or extend a blog post in Version2 by giving a topic or tentative title (e.g., "Claude Code", "OpenAI Codex", "MCP servers", "weekly digest").
---

# Version2 Blog Writer

## Purpose

This skill helps maintain and extend the `Version2` portfolio blog in a **consistent tone, structure, and code format**.

When the user provides a topic or blog name (for example, "Claude Code", "OpenAI Codex", "Gemini 3", "Tech biweekly digest"), you should:

1. **Research the topic on the web** (using the WebSearch tool) with up-to-date sources.
2. **Draft a full blog article** in the same voice and layout as existing posts in `Version2/src/features/blog/posts/`.
3. **Create or update the corresponding TypeScript files** in the `blog` feature:
   - A new post file under `Version2/src/features/blog/posts/`.
   - A metadata entry in `Version2/src/features/blog/blogData.ts`.

Always assume the goal is to create a production-ready blog post wired into the app unless the user explicitly asks for “just a draft” or “just markdown”.

---

## Tone & Style Guidelines

Match the style of existing posts such as `openai-codex`, `claude-code`, `langchain`, and the biweekly digests:

- **Audience**: Builders—software engineers, ML engineers, technical product folks.
- **Voice**: Clear, confident, and practical; avoid hype and clickbait.
- **Perspective**: Mostly third-person with occasional direct address (“you”) when giving concrete advice.
- **Structure**:
  - Strong opening paragraph that sets context and why the topic matters *now* (2025–2026).
  - Multiple sections with **`<h4>` headings** (e.g., “What is X?”, “Key Capabilities”, “How it Compares”, “Practical Use Cases”, “Getting Started”, “Limitations”, “The Bigger Picture”).
  - For digests, use **numbered section headings** (e.g., `1.`, `2.`) with “Why this matters” / “Action for builders” bullets.
- **Depth**:
  - Focus on **what this means for practitioners**: trade-offs, patterns, and specific actions.
  - Prefer concrete examples (“route long-running tasks to deeper reasoning models”) over vague generalities.
- **Closing**:
  - A short reflective “bigger picture” or “macro view” section.
  - A blue “engagement box” inviting readers to share their experience or constraints.
  - A sign-off line: `Until next time,` + `Sairam Maruri`.
  - A short note: “This article includes AI-assisted writing and manual curation. Use at your own risk.”

---

## HTML & Layout Conventions

The `content` field of each post is **HTML with Tailwind classes**, consistent with existing posts like `openaiCodex`, `claudeCode`, and `langchainOrchestrationForAI`.

Follow these patterns:

- **Paragraphs**:
  - First paragraph (hook):  
    `<p class="mb-4 text-lg text-gray-900">...</p>`
  - Subsequent body paragraphs:  
    `<p class="mb-4 text-gray-700">...</p>`  
    or  
    `<p class="mb-6 text-gray-700">...</p>` for a bit more spacing.
- **Section Headings**:
  - Use `<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Section Title</h4>`.
- **Lists**:
  - Bulleted lists:  
    `<ul class="mb-6 text-gray-700 list-disc list-inside space-y-2"> ... </ul>`
  - Inside lists, wrap each item in `<li>...</li>`, using `<strong>` for key phrases.
- **Code Blocks** (when needed):
  - Wrap in `<pre class="bg-gray-50 p-4 rounded-lg mb-6 overflow-x-auto text-sm text-gray-800">...</pre>`.
- **Sources Section**:
  - Use a collapsible `<details>` block similar to:

    ```html
    <details class="mb-8 border border-gray-200 rounded-lg">
      <summary class="px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 font-medium text-gray-900 rounded-t-lg">
        Sources & References
      </summary>
      <div class="p-4 space-y-3">
        <div class="grid gap-3">
          <a href="https://example.com" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">
            Descriptive Source Title
          </a>
          <!-- more links -->
        </div>
      </div>
    </details>
    ```

- **Engagement Box**:
  - Use a blue callout box at the end:

    ```html
    <div class="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8">
      <div class="space-y-4">
        <p class="text-gray-700 text-base leading-relaxed">
          [A short question asking readers about their experience or constraints.]
        </p>
        <div class="space-y-2">
          <p class="text-gray-700">Until next time,</p>
          <p class="text-gray-900 font-medium italic">Sairam Maruri</p>
        </div>
      </div>
    </div>
    ```

- **AI-Assistance Note**:

  ```html
  <div class="mt-6 text-sm text-gray-500">
    <p>Note: This article includes AI-assisted writing and manual curation. Use at your own risk.</p>
  </div>
  ```

Preserve indentation and backticks exactly so the TypeScript string compiles cleanly.

---

## Data & File Wiring

When creating a new blog post in Version2, follow this workflow.

### 1. Derive a slug and IDs

- Convert the user-provided title or topic into:
  - **`id` / slug**: kebab-case, lowercase, short but descriptive.  
    - Examples:
      - `"Claude Code"` → `claude-code`
      - `"OpenAI Codex"` → `openai-codex`
      - `"Tech BiWeekly Digest: February 2026"` → `tech-biweekly-digest-feb-2026`
  - Ensure the slug is **unique** w.r.t. existing `blogPosts` in `blogData.ts`.

### 2. Add metadata in `blogData.ts`

- Open `Version2/src/features/blog/blogData.ts`.
- Add a new `BlogPost` object to the exported `blogPosts` array with:
  - `id`: the slug.
  - `title`: the full title.
  - `excerpt`: 1–2 sentence summary, ~2–3 lines, builder-focused.
  - `date`: human-readable date string (e.g., `"February 2, 2026"`).
  - `readTime`: e.g., `"14 min read"` (estimate based on length).
  - `tags`: 4–7 tags, reusing existing tag vocab where possible (`"AI/ML"`, `"Developer Tools"`, `"Cloud Computing"`, `"RAG"`, `"Automation"`, etc.).
  - `icon`: pick from existing icons, e.g. `"Robot"`, `"Terminal"`, `"Globe"`, `"Database"`, `"Cloud"`, `"BrainCircuit"`, `"BookOpen"`, etc., matching the topic.
  - `iconColor`: pick a color string already used in the file (`"green"`, `"orange"`, `"purple"`, `"blue"`, `"teal"`, `"indigo"`, `"red"`).
- **Do not** set `content` here; the full HTML lives in the post file.
- Keep formatting consistent with surrounding entries (indentation, trailing commas).

### 3. Create the post file under `posts/`

- Path pattern:  
  `Version2/src/features/blog/posts/[slug].ts`
- Export a named constant shaped like existing posts:

```ts
export const examplePost = {
  id: "example-slug",
  title: "Example Title",
  excerpt: "Short, 1–2 sentence summary that could be used in previews.",
  date: "February 2, 2026",
  readTime: "14 min read",
  tags: ["AI/ML", "Developer Tools"],
  icon: "Robot",
  iconColor: "green",
  content: `
  ...HTML content following the conventions in this skill...
  `,
};
```

- The constant name should be a readable camelCase variant of the slug, aligned with existing patterns:
  - `openai-codex` → `openaiCodex`
  - `claude-code` → `claudeCode`
  - `biweekly-tech-2025-11-23-12-07` → `biweeklyTechDec7To23`
- Keep consistent import/export style with other `posts/*.ts` files.

---

## Web Research Workflow

When generating a new blog post, you **must** ground it in current, reputable sources.

1. **Clarify the topic (internally)**:
   - Infer whether it is:
     - A **tool deep-dive** (e.g., Claude Code, OpenAI Codex, Agent Builder).
     - A **concept explainer** (e.g., RAG, LLM hallucinations, vector databases).
     - A **digest / radar post** (e.g., “Tech biweekly digest February 2026”).
2. **Use WebSearch**:
   - Search with year **2026** (or the most relevant current timeframe) and include key terms:
     - Examples: `"Claude Code Anthropic 2026"`, `"Gemini 3 AI 2026"`, `"Kimi K2 thinking agent 2025 2026"`.
   - Combine **multiple queries** when needed (product name + “overview”, “best practices”, “developer docs”, etc.).
3. **Synthesize, don’t copy**:
   - Extract **facts, capabilities, limitations, and best practices** from multiple sources.
   - Rewrite everything in the user’s tone and structure; never copy paragraphs verbatim.
   - Cross-check critical claims across at least two sources when possible.
4. **Record sources**:
   - Collect 4–10 high-quality URLs (official docs, engineering blogs, reputable news/analysis).
   - Use them in the **Sources & References** `<details>` block at the end.

---

## Content Structure Templates

### A. Tool / Product Deep-Dive (e.g., Claude Code, Codex, Agent Builder)

Recommended section outline:

1. **Opening**: What the tool is and why it matters now.
2. **What Is X?**
3. **Key Capabilities**
4. **How It Differs from Other Tools**
5. **Practical Use Cases**
6. **Getting Started**
7. **Tips for Effective Use**
8. **Limitations and Considerations**
9. **The Bigger Picture / Future of X**
10. **Sources & References**
11. **Engagement Box + Sign-Off + AI-Assistance Note**

### B. Concept Explainer (e.g., RAG, LLM poisoning, hallucinations)

Recommended outline:

1. **Opening**: Problem framing and why it matters.
2. **What Is X?**
3. **How It Works (High-Level)**
4. **Real-World Use Cases**
5. **Benefits**
6. **Risks / Pitfalls / Limitations**
7. **Best Practices for Builders**
8. **Where This Is Heading / Future Trends**
9. **Sources & References**
10. **Engagement Box + Sign-Off + AI-Assistance Note**

### C. Biweekly / Radar Digest

Recommended outline (mirror `biweeklyTechDec7To23`):

1. **Opening**: Macro framing for the period.
2. **Numbered Sections** (e.g., `1. Foundation Models`, `2. AI Infrastructure`, `3. Agents`, etc.).
3. Within each section:
   - Short explanation paragraphs.
   - Two bullets:
     - `<strong>Why this matters:</strong> ...`
     - `<strong>Action for builders:</strong> ...`
4. **6–8 total sections** depending on density.
5. **Sources & References**, Engagement Box, Sign-Off, AI-Assistance Note.

---

## Workflow When User Asks for a New Blog

When the user asks for a new blog in Version2 (for example: “write a blog about Claude Code”, “add a new post on Kimi K2”, “create a February 2026 tech digest”), follow these steps:

1. **Infer intent**:
   - Assume they want a **live post wired into Version2** unless they explicitly request only a draft.
2. **Plan**:
   - Decide which template (Tool Deep-Dive, Concept Explainer, Digest) best fits.
   - Sketch section headings before writing full text.
3. **Research**:
   - Use WebSearch as described above.
   - Build a short internal notes list of key points and sources.
4. **Draft content**:
   - Write the full HTML `content` string following the conventions and tone.
   - Keep paragraphs clear and information-dense; no filler.
5. **Wire into code**:
   - Create the new `posts/[slug].ts` file with the exported const.
   - Add a matching metadata entry to `blogData.ts`.
6. **Self-check**:
   - Verify:
     - TypeScript syntax (no stray backticks, unmatched quotes, or missing commas).
     - HTML structure (balanced tags, consistent classes).
     - Slug, ID, and title alignment across post file and `blogData.ts`.
7. **Explain changes to the user**:
   - Briefly summarize:
     - The chosen slug.
     - Where the new files/entries were added.
     - The main angle of the post.

If something is ambiguous (for example, unclear target audience or length), make a **reasonable assumption**, proceed, and mention the assumption in your explanation rather than asking the user to decide upfront.

---

## Examples

### Example 1: New Tool Post (“Codex for VS Code”)

- User says: “Create a blog in Version2 about Codex for VS Code.”
- You should:
  1. Infer it is a **Tool Deep-Dive**.
  2. Use WebSearch to gather up-to-date details about Codex integrations and workflows.
  3. Create slug `openai-codex-vscode` and const name like `openaiCodexVSCode`.
  4. Add metadata entry in `blogData.ts` with appropriate tags (`"AI/ML"`, `"Developer Tools"`, `"VS Code"`, `"Coding Assistant"`).
  5. Create `posts/openai-codex-vscode.ts` with HTML content using the patterns above.

### Example 2: New Digest (“Tech BiWeekly Digest: February 2026”)

- User says: “Add a February 2026 biweekly digest blog.”
- You should:
  1. Treat it as a **Digest**.
  2. Research key AI/model/infra/agent announcements from that period via WebSearch.
  3. Choose a slug like `tech-biweekly-digest-feb-2026`.
  4. Write 5–7 numbered sections, each with “Why this matters” and “Action for builders”.
  5. Include 6–10 diverse, reputable sources in the sources `<details>` block.

---

## Summary

Use this skill whenever the user wants to **grow or update the Version2 blog**. Your job is to:

- Ground new posts in **current, high-quality web research**.
- Match the **tone, HTML structure, and data wiring** of existing posts.
- Produce **ready-to-ship code changes** in `blogData.ts` and `posts/*.ts` that keep the portfolio consistent and maintainable.

