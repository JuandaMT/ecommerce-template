import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Navbar from './components/mui-components/layout/navbar/Navbar'
import ExitIntentPopup from './components/mui-components/layout/navbar/ExitIntentPopup'
import CartDrawer from './components/mui-components/layout/cart/CartDrawer'
import { CartProvider } from './contexts/CartContext'
import './App.css'
import { Footer } from './components/mui-components/layout/Footer'

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <main style={{ maxWidth: '1920px', margin: 'auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/carrito" element={<Cart />} />
          </Routes>
        </main>
        <Footer/>
        <CartDrawer />
        <ExitIntentPopup />
      </Router>
    </CartProvider>
  )
}

export default App
