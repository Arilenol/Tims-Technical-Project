import type { DataStored } from "../../models/DataStored"
import type { RatesData } from "../../models/RatesData"

const API_KEY = import.meta.env.VITE_API_KEY

export async function getExchangeRates (code: string): Promise<DataStored> {
  const res = await fetch(
    `https://currencyapi.net/api/v1/rates?base=${code}&output=json&key=${API_KEY}`
  )

  if (!res.ok) {
    throw new Error('Error API')
  }

  const data : RatesData = await res.json()
  let rates = data.rates

  const expiration = Date.now() + 30 * 60 * 1000
  const result = {
    timestamp: expiration,
    rates
  }

  localStorage.setItem(code, JSON.stringify(result))

  return result
}
