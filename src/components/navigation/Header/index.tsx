import useTranslation from "next-translate/useTranslation";
import Styles from "./Header.module.css";
import useScroll, { SCROLL_DOWN, SCROLL_UP } from "@/hooks/useScroll";

interface NavigationLinks {
  label: string;
  translationId: string;
  link: string;
}

function makeNavigationLinks(...labels: string[]): NavigationLinks[] {
  return labels.map((label) => ({
    label,
    translationId: `navigation:${label}`,
    link: `/#${label}`,
  }));
}

const navigationLinks: NavigationLinks[] = makeNavigationLinks(
  "about",
  "experience",
  "work",
  "contact"
);

function NavigationButton({ link, translationId }: NavigationLinks) {
  const { t } = useTranslation();
  return <a href={link}>{t(translationId)}</a>;
}

function NavigationList() {
  return (
    <ol>
      {navigationLinks.map((link) => (
        <li key={link.label} className={Styles.link}>
          <NavigationButton {...link} />
        </li>
      ))}
    </ol>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const { direction, top } = useScroll(SCROLL_DOWN, true, 50);
  let headerClassName = Styles.header;
  if (direction == SCROLL_DOWN && !top) {
    headerClassName = `${headerClassName} ${Styles.headerScrollDown}`;
  } else if (direction == SCROLL_UP && !top) {
    headerClassName = `${headerClassName} ${Styles.headerScrollUp}`;
  }

  return (
    <header className={headerClassName}>
      <nav className={Styles.nav}>
        <div></div>
        <div className={Styles.links}>
          <NavigationList />
          <div className={Styles.resume}>{t("navigation:resume")}</div>
        </div>
      </nav>
    </header>
  );
}
