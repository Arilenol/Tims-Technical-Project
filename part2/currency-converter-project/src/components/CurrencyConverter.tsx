import { useState } from 'react'
import type { RatesData } from '../models/RatesData'
import '/src/assets/styles/currencyConverter.css'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function CurrencyConverter () {
  const { t, i18n } = useTranslation()
  const data = localStorage.getItem('rates')
  if (!data) {
    return <p>Aucun taux disponible pour le moment</p>
  }
  const rates: RatesData = JSON.parse(data)
  const [typeRate, setTypeRate] = useState(Object.keys(rates.rates)[0])
  const [typeRateBis, setTypeRateBis] = useState(Object.keys(rates.rates)[1])

  function handleChangeBis (e: React.ChangeEvent<HTMLSelectElement>): void {
    setTypeRateBis(e.target.value)
  }

  function handleChange (e: React.ChangeEvent<HTMLSelectElement>): void {
    setTypeRate(e.target.value)
  }

  function convert (): void {}

  function save (): void {}

  return (
    <div className='converter'>
      <p>
        {t('converter.title', { valueFrom: typeRate, valueTo: typeRateBis })}
      </p>
      <div className='converterFrom'>
        <label className='labelTitle'>{t('converter.amout')}</label>
        <div className='converterContainer'>
          <input type='number' />
          <select id='inputFrom' value={typeRate} onChange={handleChange}>
            {Object.entries(rates.rates).map(([currency]) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='converterTo'>
        <label className='labelTitle'>{t('converter.to')}</label>
        <div className='converterContainer'>
          <input type='number' />
          <select id='inputTo' value={typeRateBis} onChange={handleChangeBis}>
            {Object.entries(rates.rates).map(([currency]) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className='converter-btn' onClick={convert}>Convertir</button>
      <button className='converter-btn' onClick={save}>Sauvegarder mes choix de convertion</button>
    </div>
  )
}
