import { useTranslation } from 'react-i18next'
import CurrencyConverter from '../components/CurrencyConverter'

function Home () {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('header.welcome')}</h1>
      <CurrencyConverter />
    </div>
  )
}

export default Home
