import { forwardRef } from 'react';

const Input = forwardRef(({ name, type = "text", placeholder, label, error, className = "", ...props }, ref) => {
    return (
        <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            {label && <label htmlFor={name} className="text-sm font-medium text-zinc-300 ml-1">{label}</label>}
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                ref={ref}
                {...props}
                className={`bg-zinc-900/80 border text-zinc-100 placeholder:text-zinc-600 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${error
                        ? "border-red-500/50 focus:ring-red-500/30 bg-red-950/10"
                        : "border-zinc-800 hover:border-zinc-700 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                    }`}
            />
            {error && <p className="text-red-400 text-xs font-medium ml-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                {error}
            </p>}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;