import { useRef, type ReactNode } from "react";

import NextTag from "../NextTag";
import PreviousTag from "../PreivousTag";

interface ScrollCarouselProps {
  children: ReactNode;
  step?: number;
  className?: string;
}
function ScrollCarousel({
  children,
  step = 200,
  className = "",
}: ScrollCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const handleScroll = (distance: number) => {
    scrollContainerRef.current?.scrollBy({
      left: distance,
      behavior: "smooth",
    });
  };
  return (
    <div className={`flex gap-2 items-center w-full ${className}`}>
      <PreviousTag handle={() => handleScroll(-step)} />
      <div className="flex gap-3 items-center overflow-x-auto py-1 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" ref={scrollContainerRef}>{children}</div>
      <NextTag handle={() => handleScroll(step)} />
    </div>
  );
}
export default ScrollCarousel