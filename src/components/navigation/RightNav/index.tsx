import SideNav from "../SideNav";
import Styles from "./RightNav.module.css";

const mail = "baptiste@demontangon.fr";

export default function RightNav() {
  return (
    <SideNav side="right">
      <a className={Styles.mail} href={`mailto:${mail}`}>
        {mail}
      </a>
    </SideNav>
  );
}
