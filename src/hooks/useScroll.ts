import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

export const [SCROLL_UP, SCROLL_DOWN] = ["up", "down"] as const;

type ScrollDirection = typeof SCROLL_UP | typeof SCROLL_DOWN;

const THRESHOLD = 5;

interface ScrollInfo {
  direction: ScrollDirection;
  top: boolean;
  asScrolled: boolean;
}

interface useScrollProps {
  initialDirection?: ScrollDirection,
  isTop?: boolean,
  topOffset?: number;
}

export default function useScroll({
  initialDirection = SCROLL_DOWN,
  isTop = true,
  topOffset = THRESHOLD,

}: useScrollProps = {}): ScrollInfo {
  const [direction, setDirection] = useState(initialDirection);
  const [top, setTop] = useState(isTop);
  const [asScrolled, setAsScrolled] = useDebounce(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      setTop(window.scrollY < topOffset);

      if (Math.abs(scrollY - lastScrollY) < THRESHOLD) {
        // We haven't exceeded the threshold
        ticking = false;
        return;
      }
      setAsScrolled((as) => !as);
      setDirection(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [topOffset, setAsScrolled]);

  return {
    direction,
    top,
    asScrolled
  };
}
