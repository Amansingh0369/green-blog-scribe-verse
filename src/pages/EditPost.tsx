
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostForm from "@/components/BlogPostForm";
import { Button } from "@/components/ui/button";
import { getBlogPostById } from "@/lib/blog-service";
import { BlogPost } from "@/types/blog";

const EditPost = () => {
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
            <p className="text-gray-600 mb-6">The blog post you're trying to edit doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/")} className="bg-green-600 hover:bg-green-700">
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-green-700 mb-6">Edit Post</h1>
          <BlogPostForm initialData={post!} isEditing={true} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditPost;
