import useTranslation from "next-translate/useTranslation";
import Styles from "./Intro.module.css";
import Trans from "next-translate/Trans";

export default function Intro() {
  const { t } = useTranslation("content");
  return (
    <section className={Styles.intro}>
      <div className={Styles.introSection}>
        <p className={Styles.section1}>{t("hi_my_name_is")}</p>
      </div>
      <div className={Styles.introSection}>
        <p className={Styles.section2}>{t("name")}</p>
      </div>
      <div className={Styles.introSection}>
        <p className={Styles.section3}>{t("what_I_do")}</p>
      </div>
      <div className={Styles.introSection}>
        <p className={Styles.summary}>
          <Trans
            i18nKey="content:summary"
            components={{
              esiea: (
                <a
                  href="https://www.esiea.fr/"
                  key="esiea"
                  target="_blank"
                  className={Styles.link}
                />
              ),
              ssg: (
                <a
                  href="https://www.soprasteria.fr/"
                  key="ssg"
                  target="_blank"
                  className={Styles.link}
                />
              ),
            }}
          />
        </p>
      </div>
    </section>
  );
}
