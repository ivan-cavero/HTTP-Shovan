interface ButtonAnimatedBorderProps {
    children?: React.ReactNode;
    bgColor?: string;
    hoverBgColor?: string;
    textColor?: string;
  }

export function ButtonAnimatedBorder({ 
    children,
    bgColor = 'bg-neutral-950',
    hoverBgColor = 'bg-neutral-900',
    textColor = 'text-neutral-400',
} : ButtonAnimatedBorderProps) {
    return (
      <button className="group relative grid overflow-hidden rounded-xl px-4 py-2 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
        <span>
          <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-xl [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
        </span>
        <span className={`backdrop absolute inset-px rounded-[11px] ${bgColor} transition-colors duration-200 group-hover:${hoverBgColor}`} />
        <span className={`z-10 ${textColor} text-sm font-medium`}>{children}</span>
      </button>
    );
}