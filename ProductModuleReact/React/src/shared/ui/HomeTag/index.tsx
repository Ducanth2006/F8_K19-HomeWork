interface HomeTagProps {
  nameTag: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

function HomeTag({ nameTag, isActive = false, onClick, className = "" }: HomeTagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-full
        transition-all duration-200 ease-in-out cursor-pointer whitespace-nowrap select-none
        focus:outline-none focus:ring-2 focus:ring-emerald-500/30 active:scale-95
        ${isActive
          ? "bg-green-600 text-white border border-emerald-600 shadow-sm  font-semibold"
          : "bg-gray-100/80 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 border border-gray-200 hover:border-emerald-300"
        }
        ${className}
      `.trim().replace(/\s+/g, " ")}
    >
      {nameTag}
    </button>
  );
}

export default HomeTag;

