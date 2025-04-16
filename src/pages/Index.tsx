
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostCard from "@/components/BlogPostCard";
import { getAllBlogPosts, initializeBlogPosts } from "@/lib/blog-service";
import { BlogPost } from "@/types/blog";
import { Leaf } from "lucide-react";

const Index = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize sample data if needed and load posts
    initializeBlogPosts();
    const blogPosts = getAllBlogPosts();
    setPosts(blogPosts);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="text-green-600 h-8 w-8 mr-2" />
            <h1 className="text-4xl font-bold text-green-600">Green Blog</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your thoughts on environmental sustainability, eco-friendly living, 
            and making a positive impact on our planet.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Latest Posts</h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p>Loading posts...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-green-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No posts yet</h3>
              <p className="text-gray-600 mb-4">Time to create your first blog post!</p>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
