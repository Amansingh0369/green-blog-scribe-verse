
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send } from "lucide-react";
import { addComment, BlogComment } from "@/lib/blog-service";
import { toast } from "sonner";

interface CommentsProps {
  postId: string;
  comments: BlogComment[];
}

const Comments = ({ postId, comments: initialComments }: CommentsProps) => {
  const [comments, setComments] = useState<BlogComment[]>(initialComments || []);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    const comment: BlogComment = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      author: name,
      content: newComment,
      createdAt: new Date().toISOString(),
      postId
    };

    addComment(postId, comment);
    setComments([...comments, comment]);
    setNewComment("");
    toast.success("Comment added successfully!");
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <MessageSquare className="text-green-600 h-6 w-6 mr-2" />
        <h3 className="text-xl font-semibold text-gray-800">Comments ({comments.length})</h3>
      </div>

      {comments.length > 0 ? (
        <div className="space-y-4 mb-8">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-green-700">{comment.author}</h4>
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-green-50/50 rounded-lg mb-8">
          <p className="text-gray-600">Be the first to comment!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-green-200"
          />
        </div>
        <div>
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border-green-200 min-h-[100px]"
          />
        </div>
        <Button type="submit" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
          <Send className="mr-2 h-4 w-4" />
          Post Comment
        </Button>
      </form>
    </div>
  );
};

export default Comments;
