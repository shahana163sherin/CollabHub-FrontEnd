export default function  NavBar () {
    
    return(
        
             <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
           <img src='src/assets/Images/Logo (2).jpg ' width={300 }></img>
            {/* <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              CollabHub
            </span> */}
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
            <a href="#works" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">How It</a>
            <a href="#social" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Social</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
            <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all">
              Sign In
            </button>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    
    );

}