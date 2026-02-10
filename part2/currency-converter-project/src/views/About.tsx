import { useTranslation } from "react-i18next"

function About() {
  const { t } = useTranslation()
  return (
    <section className="about">
      <h2>{t("about.title")}</h2>
      <p>{t("about.description.paragraph1")}</p>

      <p>
        {t("about.description.paragraph2")}
      </p>

      <p>
        {t("about.description.paragraph3")}
      </p>

      <h3>{t("about.technologies.title")}</h3>

      <ul>
        <li>{t("about.technologies.items.0")}</li>
        <li>{t("about.technologies.items.1")}</li>
        <li>{t("about.technologies.items.2")}</li>
        <li>{t("about.technologies.items.3")}</li>
        <li>{t("about.technologies.items.4")}</li>
      </ul>
    </section>

  )
}

export default About
