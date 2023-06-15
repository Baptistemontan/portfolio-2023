import useTranslation from "next-translate/useTranslation";
import Styles from "./Header.module.css";
import useScroll, { SCROLL_DOWN, SCROLL_UP } from "@/hooks/useScroll";
import { useState } from "react";

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

interface HamburgerProps {
  onClick: () => void;
  isOpen: boolean;
}

function Hamburger({ onClick, isOpen }: HamburgerProps) {
  const className = isOpen
    ? `${Styles.hamburger} ${Styles.hamburgerClicked}`
    : Styles.hamburger;

  return (
    <div className={Styles.hamburgerWrapper} onClick={onClick}>
      <span className={className} />
    </div>
  );
}

function SideMenu({ menuOpen, toggleMenu }: HeaderProps) {
  const { t } = useTranslation();

  const menuClassname = menuOpen
    ? `${Styles.sideMenu} ${Styles.sideMenuOpen}`
    : Styles.sideMenu;

  const blurClassname = menuOpen
    ? `${Styles.blur} ${Styles.sideMenuOpen}`
    : Styles.sideMenu;

  return (
    <>
      <Hamburger onClick={toggleMenu} isOpen={menuOpen} />
      <div className={blurClassname} onClick={toggleMenu}></div>
      <div className={menuClassname}>
        <NavigationList />
        <div className={Styles.resume}>{t("navigation:resume")}</div>
      </div>
    </>
  );
}

interface HeaderProps {
  toggleMenu: () => void;
  menuOpen: boolean;
}

export default function Header(props: HeaderProps) {
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
        <div className={Styles.topLinks}>
          <NavigationList />
          <div className={Styles.resume}>{t("navigation:resume")}</div>
        </div>
        <SideMenu {...props} />
      </nav>
    </header>
  );
}
