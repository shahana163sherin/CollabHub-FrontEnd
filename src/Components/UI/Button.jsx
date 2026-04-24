export default function Button({ children, className = "", variant = "primary", size = "md", ...props }) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40 focus:ring-emerald-500 border border-emerald-500/50",
    secondary: "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 focus:ring-zinc-600",
    accent: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg shadow-amber-900/30 focus:ring-amber-500 border border-amber-400/50",
    outline: "bg-transparent border-2 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 focus:ring-emerald-500",
    ghost: "bg-transparent text-zinc-300 hover:text-white hover:bg-zinc-800/50 focus:ring-zinc-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-4 text-lg font-semibold",
    icon: "p-2",
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
