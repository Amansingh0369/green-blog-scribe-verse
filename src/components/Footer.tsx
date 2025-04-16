
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600">
          © {currentYear} <span className="text-green-600 font-medium">Green Blog</span>. All rights reserved.
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="text-gray-500 hover:text-green-600">About</a>
          <a href="#" className="text-gray-500 hover:text-green-600">Privacy</a>
          <a href="#" className="text-gray-500 hover:text-green-600">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
