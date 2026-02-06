export interface RatesData {
  valid: boolean
  updated: number
  base: string
  rates: Record<string, number>
}
