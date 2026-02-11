import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

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
      <p>
        {t("about.description.paragraph4")}
      </p>

      <h3>{t("about.technologies.title")}</h3>

      <ul>
        <li>{t("about.technologies.items.0")}</li>
        <li>{t("about.technologies.items.1")}</li>
        <li>{t("about.technologies.items.2")}</li>
        <li>{t("about.technologies.items.3")}</li>
        <li>{t("about.technologies.items.4")} <Link to="https://www.exchangerate-api.com">ExchangeRate API</Link></li>
      </ul>
    </section>

  )
}

export default About
