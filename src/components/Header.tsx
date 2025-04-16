
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-green-600 font-bold text-2xl">Green Blog</h1>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="text-gray-700" />
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-green-600">Home</Link>
          <Link to="/create" className="text-gray-600 hover:text-green-600">
            <Button variant="default" className="bg-green-600 hover:bg-green-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </nav>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden border-b border-gray-200">
            <div className="flex flex-col p-4">
              <Link 
                to="/" 
                className="py-2 text-gray-600 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/create" 
                className="py-2 text-gray-600 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                New Post
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
