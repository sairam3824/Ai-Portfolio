// Example of how to add a new blog post
// Just create a new file like this and add it to the index.ts

export const exampleNewPost = {
    id: "example-new-post",
    title: "How to Add New Blog Posts",
    excerpt: "A simple guide on how to add new blog posts to your portfolio using the new dynamic blog system.",
    date: "January 2025",
    readTime: "3 min read",
    tags: ["Tutorial", "Blog", "Guide"],
    icon: "BookOpen", // Any Lucide React icon name
    iconColor: "blue", // green, blue, purple, orange, red, yellow
    content: `
    <p class="mb-4 text-lg text-gray-900">
      Adding new blog posts is now super easy with the new dynamic system!
    </p>

    <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Steps to Add a New Post:</h4>
    <ol class="list-decimal list-inside mb-6 space-y-3 pl-4 text-gray-700">
      <li>Create a new file in <code>src/content/blogs/your-post-name.ts</code></li>
      <li>Export a post object with all the required fields</li>
      <li>Add the import and post to <code>src/content/blogs/index.ts</code></li>
      <li>That's it! Your post will automatically appear in the blog section</li>
    </ol>

    <p class="mb-4 text-gray-700">
      The system automatically handles rendering, modals, and navigation for you.
    </p>
  `
};

// Don't forget to add this to index.ts:
// import { exampleNewPost } from './example-new-post';
// And add it to the blogPosts array