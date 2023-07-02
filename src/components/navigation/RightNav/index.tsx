import useTranslation from "next-translate/useTranslation";
import SideNav from "../SideNav";
import Styles from "./RightNav.module.css";
import { FR, US } from "country-flag-icons/react/3x2";
import setLanguage from "next-translate/setLanguage";

const mail = "baptiste@demontangon.fr";

export function LangIcon() {
  const { t, lang } = useTranslation("common");
  if (lang === "fr") {
    const switchLang = () => setLanguage("en");
    const label = t("switch-lang");
    return <US onClick={switchLang} aria-label={label} title={label} />;
  } else {
    const switchLang = () => setLanguage("fr");
    const label = t("switch-lang");
    return <FR onClick={switchLang} aria-label={label} title={label} />;
  }
}

export default function RightNav() {
  return (
    <SideNav side="right">
      <div className={Styles.flag}>
        <LangIcon />
      </div>
      <a className={Styles.mail} href={`mailto:${mail}`}>
        {mail}
      </a>
    </SideNav>
  );
}
