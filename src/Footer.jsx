export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 ">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        
        <div>
          <h2 className="text-2xl font-bold text-white">Online Tech Course</h2>
          <p className="mt-3 text-sm text-gray-400">
            Building modern web applications with learn and creativity.
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Facebook</a></li>
            <li><a href="#" className="hover:text-white">Twitter</a></li>
            <li><a href="#" className="hover:text-white">Instagram</a></li>
            <li><a href="#" className="hover:text-white">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Online Tech Course. All rights reserved.
      </div>
    </footer>
  );
}
