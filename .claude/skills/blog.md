# Blog Creation Skill

## Overview
Create blog posts for Sairam Maruri's AI Portfolio in his established writing tone and style.

## Trigger
Use this skill when the user wants to create a new blog post. Examples:
- "Create a blog about [topic]"
- "Write a blog on [topic]"
- "New blog: [topic]"
- "/blog [topic]"

## Blog Location
All blog posts are TypeScript files located at:
`/Users/sairammaruri/Documents/Git/Ai-Portfolio/Version1/src/features/blog/posts/`

## File Structure
Each blog post is a `.ts` file with this exact structure:

```typescript
export const BlogName = {
  id: "kebab-case-id",
  title: "Full Blog Title in 2025/2026",
  excerpt: "1-2 sentence compelling summary of the blog content.",
  date: "Month DD, YYYY",
  readTime: "X min read",
  tags: ["Tag1", "Tag2", "Tag3", "Tag4"],
  icon: "IconName",
  iconColor: "color",
  content: `
    <!-- HTML content here -->
  `
};
```

### Available Icons
Choose from: `BrainCircuit`, `Cloud`, `Code2`, `Cpu`, `Database`, `Layers`, `Lightbulb`, `Network`, `Rocket`, `Server`, `Sparkles`, `Terminal`, `Zap`

### Available Icon Colors
Choose from: `purple`, `blue`, `orange`, `indigo`, `green`, `red`, `cyan`, `pink`

## Sairam's Writing Tone & Style

### Voice Characteristics
1. **Professional Yet Accessible** - Technical but not overly complex
2. **Conversational and Engaging** - Uses "you/your" to engage readers directly
3. **Forward-Looking** - References current year, "today," "emerging," "latest"
4. **Practical and Implementation-Focused** - Theory balanced with actionable guidance

### Opening Patterns (ALWAYS start with one of these styles)
- "As [technology] continues to reshape industries in [year]..."
- "[Technology] stands at the forefront of [field] in [year]..."
- "In [year], [technology] has become..."
- "The quest to build [concept] has never been more..."
- Hook with a relatable statement or statistic

### Section Structure (FOLLOW THIS ORDER)
1. **Opening paragraph** - Compelling hook establishing relevance (use `text-lg`)
2. **What is X?** - Definition section explaining the core concept
3. **Key Features / What's New** - Technical details and capabilities
4. **Why It Matters** - Business and practical relevance
5. **Real-World Use Cases** - Concrete applications and examples
6. **Best Practices / Getting Started** - Actionable guidance
7. **Looking Ahead / Conclusion** - Future implications and summary
8. **Sources & References** - Collapsible section with links
9. **Blue Engagement Box** - Question + sign-off from Sairam
10. **Disclaimer** - AI-assisted writing note

### Signature Phrases to Use
- "In [current year]" / "in today's"
- "From X to Y" (showing scope)
- "The power of" / "The magic of"
- "Embrace," "Unlock," "Master," "Transform"
- "At the forefront," "Cutting-edge," "State-of-the-art"
- "Let's dive deep," "Let's walk through"

### Content Guidelines
- Use bullet points for lists of features/benefits
- Include code snippets when relevant (in gray background)
- Break complex concepts into digestible chunks
- Provide both "what" (concepts) and "how" (implementation)
- Target 10-20 minute read time based on topic depth

## HTML Content Template

```html
<p class="mb-4 text-lg text-gray-900">
  [Opening hook paragraph - compelling and establishes relevance]
</p>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">What is [Topic]?</h4>
<p class="mb-4 text-gray-700">
  [Definition and explanation]
</p>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Key Features</h4>
<ul class="mb-6 text-gray-700 list-disc list-inside space-y-2">
  <li><strong>Feature 1:</strong> Description</li>
  <li><strong>Feature 2:</strong> Description</li>
</ul>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Why It Matters</h4>
<p class="mb-4 text-gray-700">
  [Business and practical relevance]
</p>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Real-World Use Cases</h4>
<ul class="mb-6 text-gray-700 list-disc list-inside space-y-2">
  <li>[Use case 1]</li>
  <li>[Use case 2]</li>
</ul>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Best Practices</h4>
<p class="mb-4 text-gray-700">
  [Actionable guidance]
</p>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Looking Ahead</h4>
<p class="mb-8 text-gray-700">
  [Future implications and summary]
</p>

<!-- Collapsible Sources Section -->
<details class="mb-8 border border-gray-200 rounded-lg">
  <summary class="px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 font-medium text-gray-900 rounded-t-lg">
    Sources & References
  </summary>
  <div class="p-4 space-y-3">
    <div class="grid gap-3">
      <a href="[URL]" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">
        [Source Title] - [Publisher] (YYYY-MM-DD)
      </a>
    </div>
  </div>
</details>

<!-- Blue Engagement Box -->
<div class="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8">
  <div class="space-y-4">
    <p class="text-gray-700 text-base leading-relaxed">
      [Engaging question related to the topic - invite reader participation]
    </p>
    <div class="space-y-2">
      <p class="text-gray-700">Until next time,</p>
      <p class="text-gray-900 font-medium italic">Sairam Maruri</p>
    </div>
  </div>
</div>

<div class="mt-6 text-sm text-gray-500">
  <p>Note: This article includes AI-assisted writing and manual expert curation. Use at your own risk.</p>
</div>
```

## Workflow

1. **Research the topic** - Use WebSearch to gather current information and sources
2. **Create the file** - Use kebab-case filename (e.g., `topic-name.ts`)
3. **Write content** - Follow the template and tone guidelines above
4. **Add to blog index** - Update the blog posts index file to include the new blog
5. **Verify** - Ensure all sections are complete and styling is consistent

## Blog Index Update
After creating a blog, update the index file at:
`/Users/sairammaruri/Documents/Git/Ai-Portfolio/Version1/src/features/blog/index.ts`

1. **Add the import** at the top with other imports:
```typescript
import { blogExportName } from './posts/filename';
```

2. **Add to blogPosts array** (add at the beginning for newest posts):
```typescript
export const blogPosts: BlogPost[] = [
    newBlogName,  // Add new blog here
    // ... existing blogs
];
```

The export name in the blog file should be camelCase (e.g., `awsBedrock`, `llmHallucination`, `modernIdes2025`).

## Example Engagement Questions (for Blue Box)
- "Have you tried [technology] in your projects? What was your experience?"
- "What challenges have you faced when implementing [concept]?"
- "How do you see [topic] evolving in the next few years?"
- "Share your thoughts on [topic] - I'd love to hear your perspective!"

## Sign-off Variations
- "Until next time,"
- "Regards,"
- "Warm regards,"
- "Keep building,"
- "Keep grinding," (for DSA/coding topics)

Always sign as: **Sairam Maruri**
