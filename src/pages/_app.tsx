import Header from "@/components/navigation/Header";
import LeftNav from "@/components/navigation/LeftNav";
import RightNav from "@/components/navigation/RightNav";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div id="mainDiv">
      <Header />
      <LeftNav />
      <RightNav />
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
