import useTranslation from "next-translate/useTranslation";
import Styles from "./Header.module.css";
import useScroll, { SCROLL_DOWN, SCROLL_UP } from "@/hooks/useScroll";
import { useState } from "react";
import Link from "next/link";

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

export const viewsLinks = ["about", "experience", "work", "contact"] as const;
export type Views = (typeof viewsLinks)[number];

const navigationLinks: NavigationLinks[] = makeNavigationLinks(...viewsLinks);

function NavigationButton({ link, translationId }: NavigationLinks) {
  const { t } = useTranslation();
  return <Link href={link}>{t(translationId)}</Link>;
}

function NavigationList({ currentView }: { currentView: Views | null }) {
  return (
    <ol>
      {navigationLinks.map((link) => {
        const className =
          currentView === link.label
            ? `${Styles.link} ${Styles.selectedLink}`
            : Styles.link;
        return (
          <li key={link.label} className={className}>
            <NavigationButton {...link} />
          </li>
        );
      })}
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

function SideMenu({ menuOpen, toggleMenu, view }: HeaderProps) {
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
        <NavigationList currentView={view} />
        <div className={Styles.resume}>{t("navigation:resume")}</div>
      </div>
    </>
  );
}

interface HeaderProps {
  toggleMenu: () => void;
  menuOpen: boolean;
  view: Views | null;
}

export default function Header(props: HeaderProps) {
  const { t } = useTranslation();
  const { direction, top } = useScroll({ topOffset: 50 });

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
          <NavigationList currentView={props.view} />
          <div className={Styles.resume}>{t("navigation:resume")}</div>
        </div>
        <SideMenu {...props} />
      </nav>
    </header>
  );
}
