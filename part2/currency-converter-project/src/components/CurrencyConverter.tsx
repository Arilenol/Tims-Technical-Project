import { useEffect, useState } from 'react'
import '/src/assets/styles/currencyConverter.css'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n/i18nLoader'
import currencies from '../models/currencies'
import { getExchangeRates } from '../services/api/currency'
import type { DataStored } from '../models/DataStored'
import type { TypeHistory } from '../models/TypeHistory'
import { useLocation } from 'react-router-dom'

export default function CurrencyConverter() {
  const { t } = useTranslation()
  const location = useLocation()
  //Fecth all the Code currencies available to convert from currencies.tsx
  const data: Record<string,string> = currencies

  const accuracyNumbers: number[] = [1, 0.1, 0.01, 0.001, 0.0001, 0.00001]
  const [accuracy, setAccuracy] = useState(0.01)
  
  // Hooks for the header of the converter to have more information about the conversion
  const [rate, setRate] = useState<number>(-1)
  const [date, setDate] = useState<number>()

  //If we are coming from history, this command is used to pre-load the data fields
  const itemPreSave = location.state ? location.state.item : null

  // All the hooks are declared to have their states
  const [codeCurrencyFrom, setCodeCurrencyFrom] = useState(
    itemPreSave ? itemPreSave.codeFrom : Object.keys(data).at(0)
  )
  const [codeCurrencyTo, setCodeCurrencyTo] = useState(
    itemPreSave ? itemPreSave.codeTo : Object.keys(data).at(45)
  )
  const [amount, setAmount] = useState<number>(
    itemPreSave ? itemPreSave.amount : 0
  )
  const [result, setResult] = useState<number>(
    itemPreSave ? itemPreSave.result : 0
  )
  const [saved, setSaved] = useState<boolean>(false)
  /**
   * Updates the target currency code when the select input changes
   * 
   * @param e - The change event from the currency select element
   * @returns void
   */
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    if (e.target.id == "inputFrom") {
      setCodeCurrencyFrom(e.target.value)
    } else {
      setCodeCurrencyTo(e.target.value)
    }
  }

  useEffect(() => {
    /**
     * Converts the amount from the source currency to the target currency
     * Uses stored exchange rates from localStorage when available (valid for 30 min)
     * 
     * @throws {Error} If the API call fails to fetch exchange rates
     */
    async function convert(): Promise<void> {
      let exchangeRates: DataStored
      const data = localStorage.getItem(codeCurrencyFrom)
      // If the data who gives the exchanges rates from codeCurrencyFrom are not stored, we call the API.
      if (!data) {
        exchangeRates = await getExchangeRates(codeCurrencyFrom)
      } else {
        exchangeRates = JSON.parse(data)
        // we test if the data stored have a passed date (more than 30 min)
        if (Date.now() > exchangeRates.timestamp) {
          exchangeRates = await getExchangeRates(codeCurrencyFrom)
        }
      }

      const rate = exchangeRates.rates[codeCurrencyTo]
      setRate(rate)
      setDate(exchangeRates.timestampFetch)

      // To have the accuracy asked by the user we need to have the lenght of his selection
      const cleanAccuracy = String(accuracy).replace('.', '').length - 1
      let acc: number = 1
      for (let i = 0; i < cleanAccuracy; i++) {
        acc = acc * 10
      }
      const conversionResult = amount * rate
      setResult(Math.round(conversionResult * acc) / acc)
    }
    convert()
  }, [amount, codeCurrencyFrom, codeCurrencyTo, accuracy])


  /**
   * reverse the code Currencies in the converter that's means
   * the setCodeCurrencyFrom becomes the setCodeCurrencyTo 
   * and setCodeCurrencyTo becomes the setCodeCurrencyFrom
   * 
   * @returns void
   */
  function reverseCode(): void {
    const tmp = codeCurrencyFrom
    setCodeCurrencyFrom(codeCurrencyTo)
    setCodeCurrencyTo(tmp)
  }

  /**
   * Saves the current conversion to the history in localStorage
   * 
   * @returns void
   */
  function save(): void {
    const historyStored = localStorage.getItem('history')
    // print success message during 3 seconds 
    setSaved(true)

    const history: TypeHistory = historyStored ? JSON.parse(historyStored) : {}

    const id = Date.now().toString()

    // Add the new conversion to history
    history[id] = {
      codeFrom: codeCurrencyFrom,
      codeTo: codeCurrencyTo,
      amount: amount,
      result: result,
      date: Date.now()
    }
    localStorage.setItem('history', JSON.stringify(history))
    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  return (
    <div className='converter'>
      <div className='converterAccuracy'>
        <p>
          {t('converter.title', {
            valueFrom: codeCurrencyFrom,
            valueTo: codeCurrencyTo
          })}
        </p>
        <p className='rate'>1 {data[codeCurrencyFrom]} = {rate} {data[codeCurrencyTo]}</p>
        {date && <p className='rate'>{t("converter.date")} {new Date(date).toLocaleString(i18n.language)}</p>}
        {saved && <p className='saved'>{t("popup.message")}</p>}

        <p className='labelTitle'>{t('converter.accuracy')}</p>
        <div className='converterContainer'>
          <select
            defaultValue={accuracy}
            onChange={e => {
              setAccuracy(Number(e.target.value))
            }}
          >
            {accuracyNumbers.map(e => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='converterFrom'>
        <p className='labelTitle'>{t('converter.amout')}</p>
        <div className='converterContainer'>
          <input defaultValue={amount} id='numberEntered'
            type='number'
            onChange={e => setAmount(Number(e.target.value))}
          />
          <p className='symbol'>{data[codeCurrencyFrom]}</p>
          <select
            id='inputFrom'
            value={codeCurrencyFrom}
            onChange={handleChange}
          >
            {Object.keys(data).map(codeCurrency => (
              <option key={codeCurrency} value={codeCurrency}>
                {codeCurrency} : {t(`converter.currencies.${codeCurrency}`)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        title={t('converter.reverse')}
        className='reverseCode'
        onClick={reverseCode}
      >
        <svg
          aria-hidden='true'
          focusable='false'
          role='none'
          width='24'
          height='24'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M13.707 15.293 16 17.586V3h2v14.586l2.293-2.293 1.414 1.414-3.993 3.993a1.01 1.01 0 0 1-1.428 0l-3.993-3.993zM8 6.414V21H6V6.414L3.707 8.707 2.293 7.293 6.286 3.3a1.01 1.01 0 0 1 1.428 0l3.993 3.993-1.414 1.414z'></path>
        </svg>
      </button>
      <div className='converterTo'>
        <p className='labelTitle'>{t('converter.to')}</p>
        <div className='converterContainer'>
          <input value={result} id='result' type='number' disabled />
          <p className='symbol'>{data[codeCurrencyTo]}</p>
          <select
            id='inputTo'
            value={codeCurrencyTo}
            onChange={handleChange}
          >
            {Object.keys(data).map(codeCurrency => (
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
