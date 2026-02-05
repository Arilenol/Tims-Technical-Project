import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // const key = 'c07b17303e8e96f0df00f1f65be6e2e74ba1';
  // const base = 'USD'
  // const output = 'json'

  // const url = `https://currencyapi.net/api/v1/rates?key=${key}&base=${base}&output=${output}`




  // async function fecthCurrency(url: string) {
  //   const headers = {
  //     'Accept': 'application/json'
  //   }
  //   const response = await fetch(url, { headers })
  //   const data = await response.json()
  //   console.log(data)
  // }

  // fecthCurrency(url)


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
