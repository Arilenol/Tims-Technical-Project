export interface HistoryItem {
  codeFrom: string
  codeTo: string
  amount: number
  result: number
  date: number
}

export type History = Record<string, HistoryItem>