import { useEffect, useState } from 'react'
import '/src/assets/styles/currencyConverter.css'
import { useTranslation } from 'react-i18next'
import currencies from '../models/currencies'
import { getExchangeRates } from '../services/api/currency'
import type { DataStored } from '../models/DataStored'

export default function CurrencyConverter() {
  const { t } = useTranslation()
  const data = currencies
  const accuracyNumbers: number[] = [1, 0.1, 0.01, 0.001, 0.0001, 0.00001]
  const [accuracy, setAccuracy] = useState(0.01);
  const [codeCurrencyFrom, setCodeCurrencyFrom] = useState(data[0])
  const [codeCurrencyTo, setCodeCurrencyTo] = useState(data[1])
  const [amount, setAmount] = useState<number>(0)
  const [result, setResult] = useState<number>(0)

  function handleChangeBis(e: React.ChangeEvent<HTMLSelectElement>): void {
    setCodeCurrencyTo(e.target.value)
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    setCodeCurrencyFrom(e.target.value)
  }

  useEffect(() => {
    async function convert(): Promise<void> {
      let exchangeRates: DataStored
      const data = localStorage.getItem(codeCurrencyFrom)

      if (!data) {
        console.log("j'appelle l'api")
        exchangeRates = await getExchangeRates(codeCurrencyFrom)
      } else {
        exchangeRates = JSON.parse(data)

        if (Date.now() > exchangeRates.timestamp) {
          exchangeRates = await getExchangeRates(codeCurrencyFrom)
        }
      }

      const rate = exchangeRates.rates[codeCurrencyTo]
      const cleanAccuracy = String(accuracy).replace(".", "").length - 1
      let acc: number = 1;
      for (let i = 0; i < cleanAccuracy; i++) {
        acc = acc * 10
      }
      const conversionResult = amount * rate
      setResult(Math.round(conversionResult * acc) / acc)
    }
    convert()
  }, [amount, codeCurrencyFrom, codeCurrencyTo, accuracy])

  function save(): void { }

  return (
    <div className='converter'>
      <div className='converterAccuracy'>
        <p>
          {t('converter.title', {
            valueFrom: codeCurrencyFrom,
            valueTo: codeCurrencyTo
          })}
        </p>

        <label className='labelTitle'>{t("converter.accuracy")}</label>
        <div className='converterContainer'>

          <select defaultValue={accuracy} onChange={(e) => {
            setAccuracy(Number(e.target.value))
          }}>
            {accuracyNumbers.map((e) => (
              <option key={e} >{e}</option>
            ))}
          </select>
        </div>
      </div>

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
