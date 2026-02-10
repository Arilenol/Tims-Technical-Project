import { Link } from 'react-router-dom'
import '/src/assets/styles/header.css'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t, i18n } = useTranslation()

  const availableLanguages = ['fr', 'en']

  /**
  * Updates the current langage
  * 
  * @param e - The change event from the current langage select element
  * @returns void
  */
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    i18n.changeLanguage(e.target.value)
  }

  return (
    <header className='topbar'>
      <div className='actionHeader'>
        <Link to='/' className='header-btn'>
          {t('header.home')}
        </Link>
        <Link to='/history' className='header-btn'>
          {t('header.history')}
        </Link>
        <Link to='/about' className='header-btn'>
          {t('header.about')}
        </Link>
      </div>
      <div className='lang'>
        <p>{t('header.langChoice')}</p>
        <select id='selectLang' onChange={handleChange} value={i18n.language}>
          {availableLanguages.map(language => (
            <option key={language} value={language}>
              {language.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </header>
  )
}
