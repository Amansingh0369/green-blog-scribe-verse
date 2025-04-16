
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostForm from "@/components/BlogPostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-green-700 mb-6">Create New Post</h1>
          <BlogPostForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatePost;
