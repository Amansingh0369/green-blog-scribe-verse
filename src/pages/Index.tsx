
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostCard from "@/components/BlogPostCard";
import { getAllBlogPosts, initializeBlogPosts } from "@/lib/blog-service";
import { BlogPost } from "@/types/blog";
import { Leaf, PenLine, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    initializeBlogPosts();
    const blogPosts = getAllBlogPosts();
    setPosts(blogPosts);
    setIsLoading(false);
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-100 opacity-60 rounded-3xl -z-10"></div>
          <div className="py-16 px-6 rounded-3xl shadow-sm">
            <div className="flex items-center justify-center mb-6">
              <Leaf className="text-green-600 h-12 w-12 mr-3 animate-pulse" />
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                Green Blog
              </h1>
            </div>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
              Discover inspiring stories and practical insights about environmental sustainability, 
              eco-friendly living, and making a positive impact on our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/create">
                <Button className="bg-green-600 hover:bg-green-700 transition-all duration-300 group">
                  <PenLine className="mr-2 h-5 w-5 group-hover:rotate-6 transition-transform" />
                  Create New Post
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="mb-10 max-w-xl mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for articles..."
              className="pl-10 border-green-200 focus:border-green-400 pr-4 py-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
            {searchTerm ? "Search Results" : "Latest Environmental Insights"}
          </h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 animate-pulse">Loading green stories...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-green-50 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                {searchTerm ? "No results found" : "No posts yet"}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? "Try different keywords or check back later for new content." 
                  : "Be the first to share your environmental story!"}
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
