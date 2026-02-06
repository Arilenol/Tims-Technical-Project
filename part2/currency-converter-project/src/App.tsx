import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Header from './components/Header'
import "/src/App.css"
import About from './views/About'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <main className='page-container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App