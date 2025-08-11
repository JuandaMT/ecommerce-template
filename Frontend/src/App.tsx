import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/mui-components/layout/navbar/Navbar'
import './App.css'
import { Footer } from './components/mui-components/layout/Footer'

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ maxWidth: '1920px', margin: 'auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer/>
    </Router>
  )
}

export default App
