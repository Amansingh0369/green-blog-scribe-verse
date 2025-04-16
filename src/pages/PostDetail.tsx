
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Calendar, ThumbsUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DeletePostButton from "@/components/DeletePostButton";
import { getBlogPostById, getCommentsForPost, likeBlogPost } from "@/lib/blog-service";
import { BlogPost } from "@/types/blog";
import { BlogComment } from "@/lib/blog-service";
import Comments from "@/components/Comments";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchedPost = getBlogPostById(id);
      if (fetchedPost) {
        setPost(fetchedPost);
        setLikes(fetchedPost.likes || 0);
        // Load comments
        const postComments = getCommentsForPost(id);
        setComments(postComments);
      } else {
        toast.error("Post not found");
        navigate("/");
      }
      setLoading(false);
    }
  }, [id, navigate]);

  const handleLike = () => {
    if (!hasLiked && post) {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setHasLiked(true);
      likeBlogPost(post.id, newLikes);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <p className="text-gray-500 animate-pulse">Loading post...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-16 bg-green-50 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Post not found</h2>
            <p className="text-gray-600 mb-6">The post you're looking for may have been deleted or doesn't exist.</p>
            <Link to="/">
              <Button variant="default" className="bg-green-600 hover:bg-green-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Posts
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-50 -ml-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Posts
              </Button>
            </Link>
          </div>
          
          {/* Post header */}
          <div className="mb-8 bg-white p-8 rounded-xl shadow-sm">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center text-gray-600 mb-6 gap-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-green-600 mr-2" />
                <span>{formattedDate}</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLike}
                className={`flex items-center text-gray-600 hover:text-green-600 ${hasLiked ? 'text-green-600' : ''}`}
              >
                <ThumbsUp className={`h-4 w-4 mr-1 ${hasLiked ? 'fill-green-600' : ''}`} />
                <span>{likes}</span>
              </Button>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">{post.summary}</p>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="blog-content prose prose-green max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex justify-between mb-8">
            <Link to={`/edit/${post.id}`}>
              <Button variant="outline" className="text-green-700 border-green-500 hover:bg-green-50">
                <Edit className="mr-2 h-4 w-4" />
                Edit Post
              </Button>
            </Link>
            
            <DeletePostButton postId={post.id} />
          </div>
          
          {/* Comments section */}
          <Comments postId={post.id} comments={comments} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostDetail;
