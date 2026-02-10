import { useTranslation } from 'react-i18next'
import type { History } from '../models/TypeHistoric'
import i18n from '../i18n/i18nLoader'
import '/src/assets/styles/history.css'
import { Link } from 'react-router-dom'
import { useState, type Dispatch } from 'react'

function History() {
  const { t } = useTranslation()
  const historyStored = localStorage.getItem('history')
  const [history, setHistory]: [History, Dispatch<History>] = useState(historyStored ? JSON.parse(historyStored) : {})



  /**
   * Removes all the elements from the history stored in localStorage
   * 
   * @return void
   */
  function clearAll(): void {
    setHistory({})
    localStorage.removeItem("history")
  }

  /**
   * Removes an HistoryItem from the history stored in localStorage
   * 
   * @param idSelected - The ID of the history item to delete
   * @returns void
   */
  function deleteData(idSelected: string): void {
    const newHistory = { ...history };
    delete newHistory[idSelected];

    setHistory(newHistory);
    localStorage.setItem('history', JSON.stringify(newHistory));
  }


  return (
    <div className='history'>
      <div className='headerHistory'>
        <h1>{t('history.title')}</h1>
        <button onClick={clearAll} className='clearHistory'>{t("history.clear")}</button>
      </div>
      {Object.entries(history).map(([id, item]) => (
        <div key={id} className='historyItem'>
          <p>date : {new Date(Number(id)).toLocaleString(i18n.language)}</p>
          {item.amount} {item.codeFrom} → {item.result} {item.codeTo}
          <div className='actionButtonHistory'>
            <button onClick={() => deleteData(id)} key={id} className='clearHistoryIn'>{t("history.delete")}</button>
            <Link className="loadData" to="/" state={{ item: item }}>{t("history.load")}</Link>
          </div>
        </div>
      ))}

    </div>
  )
}

export default History
