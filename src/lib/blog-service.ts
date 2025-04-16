
import { BlogPost } from "@/types/blog";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "green-blog-posts";

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
      id: uuidv4(),
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
};

// Initialize blog with sample data if empty
export const initializeBlogPosts = (): void => {
  const posts = getAllBlogPosts();
  
  if (posts.length === 0) {
    const samplePosts: BlogPost[] = [
      {
        id: uuidv4(),
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
      },
      {
        id: uuidv4(),
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
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePosts));
  }
};
