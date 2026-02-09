import { useTranslation } from 'react-i18next'
import type { History } from '../models/TypeHistoric'
import i18n from '../i18n/i18nLoader'
import '/src/assets/styles/history.css'
import { Link } from 'react-router-dom'

function History () {
  const { t } = useTranslation()
  const historyStored = localStorage.getItem('history')

  let history: History = historyStored ? JSON.parse(historyStored) : {}

  return (
    <div className='history'>
      <h1>{t('history.title')}</h1>
      {Object.entries(history).map(([id, item]) => (
        <div key={id} className='historyItem'>
            <p>date : {new Date(Number(id)).toLocaleString(i18n.language)}</p> 
          {item.amount} {item.codeFrom} → {item.result} {item.codeTo}
          <Link className="loadData" to="/" state={{ item : item }}>{t("history.load")}</Link>
        </div>
      ))}
      
    </div>
  )
}

export default History
