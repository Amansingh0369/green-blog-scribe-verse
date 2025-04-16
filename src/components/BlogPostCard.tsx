
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, LeafIcon } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  // Format the date
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-100/50 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardTitle className="text-xl text-green-800 line-clamp-2 hover:text-green-900 transition-colors">
          <Link to={`/post/${post.id}`} className="group">
            <span className="group-hover:underline decoration-green-500">
              {post.title}
            </span>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-2">
          <CalendarIcon className="h-4 w-4 text-green-500" />
          <span>{formattedDate}</span>
        </div>
        <p className="text-gray-600 line-clamp-3 leading-relaxed">
          {post.summary}
        </p>
      </CardContent>
      <CardFooter className="bg-green-50/50 p-4">
        <Link to={`/post/${post.id}`} className="w-full">
          <Button 
            variant="outline" 
            className="w-full border-green-500 text-green-700 hover:bg-green-50 group"
          >
            <LeafIcon className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
