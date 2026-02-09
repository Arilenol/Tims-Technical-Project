import { useTranslation } from 'react-i18next'
import CurrencyConverter from '../components/CurrencyConverter'

function History() {
    const { t } = useTranslation()

    return (
        <div>
            <h1>{t('history.title')}</h1>
            <CurrencyConverter />
        </div>
    )
}

export default History
