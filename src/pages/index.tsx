import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import Header from "@/components/navigation/Header";
import Intro from "@/components/content/Intro";

const inter = Inter({ subsets: ["latin"] });

const languageSwitchTable = {
  en: "fr",
  fr: "en",
};

export default function Home() {
  return (
    <>
      <Intro />
    </>
  );
}
