import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Products from './pages/Products'
import Navbar from './components/mui-components/layout/navbar/Navbar'
import ExitIntentPopup from './components/mui-components/layout/navbar/ExitIntentPopup'
import './App.css'
import { Footer } from './components/mui-components/layout/Footer'

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ maxWidth: '1920px', margin: 'auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
        </Routes>
      </main>
      <Footer/>
      <ExitIntentPopup />
    </Router>
  )
}

export default App
