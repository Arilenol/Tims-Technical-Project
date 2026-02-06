import { Link } from 'react-router-dom'
import '/src/assets/styles/header.css'
import { useTranslation } from 'react-i18next'

export default function Header () {
  const { t, i18n } = useTranslation()

  const availableLanguages = ['fr', 'en']

  function handleChange () {
    const sel = document.getElementById('selectLang') as HTMLSelectElement
    if (sel) {
      i18n.changeLanguage(sel.value)
    }
  }

  return (
    <header className='topbar'>
      <div className='actionHeader'>
        <Link to='/' className='header-btn'>
          {t('header.home')}
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
