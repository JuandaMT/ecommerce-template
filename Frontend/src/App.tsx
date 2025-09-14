import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/mui-components/layout/navbar/Navbar'
import ExitIntentPopup from './components/mui-components/layout/navbar/ExitIntentPopup'
import CartDrawer from './components/mui-components/layout/cart/CartDrawer'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'
import { Footer } from './components/mui-components/layout/Footer'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <main style={{ maxWidth: '1920px', margin: 'auto' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Products />} />
              <Route
                path="/carrito"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/perfil"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
            </Routes>
          </main>
          <Footer/>
          <CartDrawer />
          <ExitIntentPopup />
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
