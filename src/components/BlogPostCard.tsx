
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
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
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-green-700 line-clamp-2">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <CalendarIcon className="mr-1 h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
        <p className="text-gray-600 line-clamp-3">{post.summary}</p>
      </CardContent>
      <CardFooter>
        <Link to={`/post/${post.id}`} className="w-full">
          <Button variant="outline" className="w-full border-green-500 text-green-700 hover:bg-green-50">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
