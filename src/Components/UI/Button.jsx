export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 ${className}`}
    >
      {children}
    </button>
  );
}
