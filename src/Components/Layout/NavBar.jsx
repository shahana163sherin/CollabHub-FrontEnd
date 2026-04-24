import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo mock, assuming it is light text or can be generated */}
          <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent flex items-center gap-2 tracking-tight">
            <svg className="w-8 h-8 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            CollabHub
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-lg text-zinc-300 hover:text-emerald-400 transition-colors font-semibold tracking-wide">Features</a>
          <a href="#works" className="text-lg text-zinc-300 hover:text-emerald-400 transition-colors font-semibold tracking-wide">How It Works</a>
          <a href="#social" className="text-lg text-zinc-300 hover:text-emerald-400 transition-colors font-semibold tracking-wide">Testimonials</a>
          <a href="#contact" className="text-lg text-zinc-300 hover:text-emerald-400 transition-colors font-semibold tracking-wide">Contact</a>

          <div className="flex items-center gap-4 ml-4 border-l border-zinc-800 pl-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button variant="primary" onClick={() => navigate("/registerLeader")}>
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-zinc-300 hover:text-emerald-400 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}