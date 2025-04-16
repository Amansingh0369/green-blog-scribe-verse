
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostCard from "@/components/BlogPostCard";
import { getAllBlogPosts, initializeBlogPosts } from "@/lib/blog-service";
import { BlogPost } from "@/types/blog";
import { Leaf, PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeBlogPosts();
    const blogPosts = getAllBlogPosts();
    setPosts(blogPosts);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <Leaf className="text-green-600 h-10 w-10 mr-3 animate-pulse" />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              Green Blog
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed mb-6">
            Discover inspiring stories and practical insights about environmental sustainability, 
            eco-friendly living, and making a positive impact on our planet.
          </p>
          <Link to="/create">
            <Button className="bg-green-600 hover:bg-green-700 transition-all duration-300 group">
              <PenLine className="mr-2 h-5 w-5 group-hover:rotate-6 transition-transform" />
              Create New Post
            </Button>
          </Link>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Latest Environmental Insights
          </h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 animate-pulse">Loading green stories...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-green-50 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No posts yet
              </h3>
              <p className="text-gray-600 mb-4">
                Be the first to share your environmental story!
              </p>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
