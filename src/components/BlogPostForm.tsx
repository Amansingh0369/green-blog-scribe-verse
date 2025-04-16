
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogPost } from "@/types/blog";
import { saveBlogPost } from "@/lib/blog-service";

interface BlogPostFormProps {
  initialData?: BlogPost;
  isEditing?: boolean;
}

const BlogPostForm = ({ initialData, isEditing = false }: BlogPostFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const postData: Partial<BlogPost> = {
        title,
        summary,
        content,
      };
      
      if (isEditing && initialData) {
        postData.id = initialData.id;
        postData.createdAt = initialData.createdAt;
        postData.updatedAt = new Date().toISOString();
      } else {
        postData.createdAt = new Date().toISOString();
        postData.updatedAt = new Date().toISOString();
      }
      
      await saveBlogPost(postData as BlogPost);
      
      toast({
        title: isEditing ? "Post Updated" : "Post Created",
        description: isEditing 
          ? "Your blog post has been updated successfully." 
          : "Your new blog post has been created successfully.",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-base">Title <span className="text-red-500">*</span></Label>
        <Input 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="text-lg"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="summary" className="text-base">Summary</Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Brief summary of your post"
          className="resize-none h-24"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content" className="text-base">Content <span className="text-red-500">*</span></Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog post content here..."
          className="resize-none h-64 font-mono"
          required
        />
        <p className="text-xs text-gray-500">
          You can use Markdown for formatting: **bold**, *italic*, # headings, etc.
        </p>
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-green-600 hover:bg-green-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : (isEditing ? "Update Post" : "Create Post")}
        </Button>
      </div>
    </form>
  );
};

export default BlogPostForm;
