import type { DataStored } from "../../models/DataStored"
import type { RatesData } from "../../models/RatesData"

//import the API key from the .env
const API_KEY = import.meta.env.VITE_API_KEY

/**
 * Query the API to get the exchange rates against the base rate,
 * and it will return a JSON containing 165 conversion rates. 
 * 
 * @param code - code currencies selected by the user
 * @throws {Error} If the API call fails to fetch exchange rates
*/
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

  // Calcul the expiration to have TTL (TimeToLive) of 30 minutes 
  const expiration = Date.now() + 30 * 60 * 1000
  const result = {
    timestampFetch: Date.now(),
    timestamp: expiration,
    rates
  }

  // Add the new conversion and the expiration to code (=current base) in localStorage
  localStorage.setItem(code, JSON.stringify(result))

  return result
}
