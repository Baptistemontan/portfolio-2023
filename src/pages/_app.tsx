import Header, { Views, viewsLinks } from "@/components/navigation/Header";
import LeftNav from "@/components/navigation/LeftNav";
import RightNav from "@/components/navigation/RightNav";
import useScroll from "@/hooks/useScroll";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<Views | null>(null);
  const { asScrolled } = useScroll();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [asScrolled]);

  useEffect(() => {
    const res = Array.from(asPath.matchAll(/.*#([a-z0-9]*)/gi)).at(0);
    const currentView = res?.at(1);

    if (currentView && viewsLinks.includes(currentView as Views)) {
      setView(currentView as Views);
    } else {
      setView(null);
    }
    setMenuOpen(false);
  }, [asPath]);

  return (
    <div id="mainDiv">
      <Header {...{ toggleMenu, menuOpen, view }} />
      <LeftNav />
      <RightNav />
      <main className={menuOpen ? "blur" : undefined}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
