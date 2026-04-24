export default function Card({ children, className = "", hover = true, ...props }) {
    const baseClasses = "bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl relative overflow-hidden text-lg";
    const hoverClasses = hover ? "transition-all duration-300 hover:border-emerald-500/30 hover:bg-zinc-800/60 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/20 group" : "";

    return (
        <div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
            {/* Optional subtle top highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50"></div>
            {children}
        </div>
    );
}
