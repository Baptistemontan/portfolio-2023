import { ReactElement } from "react";
import SideNav from "../SideNav";
import Styles from "./LeftNav.module.css";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { IconContext } from "react-icons";

interface IconLink {
  label: string;
  icon: ReactElement;
  link: string;
}

const links: IconLink[] = [
  {
    label: "GitHub",
    icon: <FiGithub />,
    link: "https://github.com/Baptistemontan",
  },
  {
    label: "LinkedIn",
    icon: <FiLinkedin />,
    link: "https://www.linkedin.com/in/baptiste-de-montangon/",
  },
];

export default function RightNav() {
  return (
    <SideNav side="left">
      <IconContext.Provider value={{ size: "1.4em" }}>
        <ul className={Styles.links}>
          {links.map(({ label, icon, link }) => (
            <li key={label} className={Styles.link}>
              <a aria-label={label} target="_blank" href={link} title={label}>
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </IconContext.Provider>
    </SideNav>
  );
}
