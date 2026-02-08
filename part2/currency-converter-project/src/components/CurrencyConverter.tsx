import { useEffect, useState } from 'react'
import '/src/assets/styles/currencyConverter.css'
import { useTranslation } from 'react-i18next'
import currencies from '../models/currencies'
import { getExchangeRates } from '../services/api/currency'
import type { DataStored } from '../models/DataStored'

export default function CurrencyConverter () {
  const { t } = useTranslation()
  const data = currencies

  const [codeCurrencyFrom, setCodeCurrencyFrom] = useState(data[0])
  const [codeCurrencyTo, setCodeCurrencyTo] = useState(data[1])
  const [amount, setAmount] = useState<number>(0)
  const [result, setResult] = useState<number>(0)

  function handleChangeBis (e: React.ChangeEvent<HTMLSelectElement>): void {
    setCodeCurrencyTo(e.target.value)
  }

  function handleChange (e: React.ChangeEvent<HTMLSelectElement>): void {
    setCodeCurrencyFrom(e.target.value)
  }

  async function convert (): Promise<void> {
    let exchangeRates: DataStored
    let data = localStorage.getItem(codeCurrencyFrom)

    if (!data) {
      const result = await getExchangeRates(codeCurrencyFrom)
      exchangeRates = result
    } else {
      exchangeRates = JSON.parse(data)
      if (Date.now() < exchangeRates.timestamp) {
        const result = await getExchangeRates(codeCurrencyFrom)
        exchangeRates = result
      }
      const rate = exchangeRates.rates[codeCurrencyTo]
      const conversionResult = amount * rate
      setResult(conversionResult)
    }
  }

  useEffect(() => {
    convert()
  }, [amount, codeCurrencyFrom, codeCurrencyTo])

  function save (): void {}

  return (
    <div className='converter'>
      <p>
        {t('converter.title', {
          valueFrom: codeCurrencyFrom,
          valueTo: codeCurrencyTo
        })}
      </p>
      <div className='converterFrom'>
        <label className='labelTitle'>{t('converter.amout')}</label>
        <div className='converterContainer'>
          <input
            defaultValue={amount}
            id='numberEntered'
            type='number'
            onChange={e => setAmount(Number(e.target.value))}
          />
          <select
            id='inputFrom'
            value={codeCurrencyFrom}
            onChange={handleChange}
          >
            {data.map(codeCurrency => (
              <option key={codeCurrency} value={codeCurrency}>
                {codeCurrency} : {t(`converter.currencies.${codeCurrency}`)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='converterTo'>
        <label className='labelTitle'>{t('converter.to')}</label>
        <div className='converterContainer'>
          <input value={result} id='result' type='number' disabled />
          <select
            id='inputTo'
            value={codeCurrencyTo}
            onChange={handleChangeBis}
          >
            {data.map(codeCurrency => (
              <option key={codeCurrency} value={codeCurrency}>
                {codeCurrency} : {t(`converter.currencies.${codeCurrency}`)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className='converter-btn' onClick={save}>
        {t('converter.saveConvert')}
      </button>
    </div>
  )
}
