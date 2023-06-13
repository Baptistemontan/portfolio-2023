import { PropsWithChildren } from "react";
import Styles from "./SideNav.module.css";

interface SideNavProps {
  side: "right" | "left";
}

export default function SideNav({
  children,
  side,
}: PropsWithChildren<SideNavProps>) {
  const sideClass = side == "right" ? Styles.navRight : Styles.navLeft;
  return (
    <div className={`${Styles.nav} ${sideClass}`}>
      <div className={Styles.content}>{children}</div>
    </div>
  );
}
