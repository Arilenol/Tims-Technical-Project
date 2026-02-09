import type { DataStored } from "../../models/DataStored"
import type { RatesData } from "../../models/RatesData"

const API_KEY = import.meta.env.VITE_API_KEY

export async function getExchangeRates(code: string): Promise<DataStored> {
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${code}`
  )

  if (!res.ok) {
    throw new Error('Error API')
  }

  const data: RatesData = await res.json()
  if (data.result === "error") {
    throw new Error("Error API");

  }
  const rates = data.conversion_rates

  const expiration = Date.now() + 30 * 60 * 1000
  const result = {
    timestamp: expiration,
    rates
  }

  localStorage.setItem(code, JSON.stringify(result))

  return result
}
