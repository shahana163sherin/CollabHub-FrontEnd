import { useEffect } from "react";
import Button from "./Button";

export default function Modal({ isOpen, onClose, title, children, showClose = true }) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-lg mx-4 bg-zinc-900 border border-zinc-700/50 shadow-2xl rounded-2xl overflow-hidden animate-slideDown shadow-emerald-900/20">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-amber-500"></div>

                {/* Header */}
                {(title || showClose) && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/50">
                        {title && <h3 className="text-xl font-bold text-zinc-100">{title}</h3>}
                        {showClose && (
                            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close modal" className="ml-auto rounded-full hover:bg-red-500/10 hover:text-red-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </Button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
