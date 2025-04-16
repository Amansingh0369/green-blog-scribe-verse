
import { BlogPost } from "@/types/blog";

const STORAGE_KEY = "green-blog-posts";
const COMMENTS_KEY = "green-blog-comments";

// Type for comments
export interface BlogComment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
}

// Generate a unique ID without using uuid
const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Get all blog posts
export const getAllBlogPosts = (): BlogPost[] => {
  const posts = localStorage.getItem(STORAGE_KEY);
  return posts ? JSON.parse(posts) : [];
};

// Get a single blog post by ID
export const getBlogPostById = (id: string): BlogPost | undefined => {
  const posts = getAllBlogPosts();
  return posts.find((post) => post.id === id);
};

// Save a blog post (create or update)
export const saveBlogPost = (post: BlogPost): BlogPost => {
  const posts = getAllBlogPosts();
  
  if (post.id) {
    // Update existing post
    const updatedPosts = posts.map((p) => (p.id === post.id ? post : p));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  } else {
    // Create new post
    const newPost = {
      ...post,
      id: generateUniqueId(),
      likes: 0,
    };
    const newPosts = [newPost, ...posts];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
    return newPost;
  }
  
  return post;
};

// Delete a blog post
export const deleteBlogPost = (id: string): void => {
  const posts = getAllBlogPosts();
  const updatedPosts = posts.filter((post) => post.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  
  // Also delete comments for this post
  const comments = getAllComments();
  const updatedComments = comments.filter(comment => comment.postId !== id);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(updatedComments));
};

// Like a blog post
export const likeBlogPost = (id: string, likes: number): void => {
  const posts = getAllBlogPosts();
  const updatedPosts = posts.map((post) => {
    if (post.id === id) {
      return { ...post, likes };
    }
    return post;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
};

// Get all comments
export const getAllComments = (): BlogComment[] => {
  const comments = localStorage.getItem(COMMENTS_KEY);
  return comments ? JSON.parse(comments) : [];
};

// Get comments for a specific post
export const getCommentsForPost = (postId: string): BlogComment[] => {
  const comments = getAllComments();
  return comments.filter(comment => comment.postId === postId);
};

// Add a comment
export const addComment = (postId: string, comment: BlogComment): void => {
  const comments = getAllComments();
  const updatedComments = [...comments, comment];
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(updatedComments));
};

// Initialize blog with sample data if empty
export const initializeBlogPosts = (): void => {
  const posts = getAllBlogPosts();
  
  if (posts.length === 0) {
    const samplePosts: BlogPost[] = [
      {
        id: generateUniqueId(),
        title: "Welcome to Green Blog",
        summary: "Learn about our mission to promote environmental awareness through blogging.",
        content: `# Welcome to Green Blog
        
This is the first post on our new blogging platform. Green Blog is dedicated to raising awareness about environmental issues and promoting sustainable living practices.

## Our Mission

At Green Blog, we believe that sharing knowledge and experiences is key to creating a more sustainable future. Through our platform, we aim to:

* Educate readers about environmental challenges
* Share practical tips for sustainable living
* Highlight success stories and innovations in sustainability
* Build a community of environmentally-conscious individuals

We hope you'll join us on this journey!`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 5,
      },
      {
        id: generateUniqueId(),
        title: "10 Easy Ways to Reduce Your Carbon Footprint",
        summary: "Simple changes you can make in your daily life to help the environment.",
        content: `# 10 Easy Ways to Reduce Your Carbon Footprint

Making a positive impact on the environment doesn't have to be difficult. Here are ten simple changes you can incorporate into your daily routine:

1. **Use reusable bags** when shopping
2. **Reduce water consumption** by taking shorter showers
3. **Switch to LED light bulbs** to save energy
4. **Walk or bike** for short trips instead of driving
5. **Eat less meat** by incorporating more plant-based meals
6. **Compost food scraps** to reduce waste
7. **Buy local produce** to reduce transportation emissions
8. **Use a refillable water bottle** instead of buying plastic bottles
9. **Unplug electronics** when not in use
10. **Adjust your thermostat** by a few degrees

These small changes can add up to make a significant difference when adopted by many people!`,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        likes: 12,
      },
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePosts));
    
    // Add sample comments
    const sampleComments: BlogComment[] = [
      {
        id: generateUniqueId(),
        postId: samplePosts[0].id,
        author: "Jane Smith",
        content: "Great initiative! Looking forward to more content on sustainable living.",
        createdAt: new Date().toISOString()
      },
      {
        id: generateUniqueId(),
        postId: samplePosts[1].id,
        author: "Mike Johnson",
        content: "I've been trying to reduce my carbon footprint. These tips are really helpful!",
        createdAt: new Date().toISOString()
      },
      {
        id: generateUniqueId(),
        postId: samplePosts[1].id,
        author: "Sarah Williams",
        content: "I would add: buy secondhand when possible! It makes a big difference.",
        createdAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
      }
    ];
    
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(sampleComments));
  }
};
