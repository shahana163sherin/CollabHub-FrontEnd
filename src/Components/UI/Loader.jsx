export default function Loader({ size = "md", fullScreen = false }) {
    const sizes = {
        sm: "w-5 h-5 border-2",
        md: "w-8 h-8 border-3",
        lg: "w-12 h-12 border-4",
    };

    const spinner = (
        <div className={`${sizes[size]} border-zinc-700 border-t-emerald-500 rounded-full animate-spin`}></div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm">
                {spinner}
            </div>
        );
    }

    return <div className="flex items-center justify-center p-4">{spinner}</div>;
}
