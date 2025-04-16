
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import DeletePostButton from "@/components/DeletePostButton";
import { getBlogPostById } from "@/lib/blog-service";
import { BlogPost } from "@/types/blog";
import { CalendarIcon, Clock, Edit } from "lucide-react";
import ReactMarkdown from 'react-markdown';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const blogPost = getBlogPostById(id);
      if (blogPost) {
        setPost(blogPost);
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p>Loading post...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h2>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/")} className="bg-green-600 hover:bg-green-700">
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Format dates
  const formattedCreatedDate = new Date(post!.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedUpdatedDate = new Date(post!.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const wasUpdated = post!.createdAt !== post!.updatedAt;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link to="/" className="text-green-600 hover:text-green-800 flex items-center">
              ← Back to all posts
            </Link>
          </div>

          {/* Post header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {post!.title}
            </h1>
            
            {post!.summary && (
              <p className="text-lg text-gray-600 mb-4">
                {post!.summary}
              </p>
            )}
            
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-4">
              <div className="flex items-center">
                <CalendarIcon className="mr-1 h-4 w-4" />
                <span>Posted on {formattedCreatedDate}</span>
              </div>
              
              {wasUpdated && (
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Updated on {formattedUpdatedDate}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link to={`/edit/${post!.id}`}>
                <Button variant="outline" size="sm" className="border-green-500 text-green-700 hover:bg-green-50">
                  <Edit className="mr-1 h-4 w-4" /> Edit
                </Button>
              </Link>
              <DeletePostButton postId={post!.id} postTitle={post!.title} />
            </div>
          </header>

          {/* Post content */}
          <div className="prose max-w-none blog-content">
            <ReactMarkdown>{post!.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;
