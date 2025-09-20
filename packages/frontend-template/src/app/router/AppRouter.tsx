import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '../../shared/components/layout/Layout'
import { HomePage } from '../../domains/products/pages/HomePage'
import { ProductsPage } from '../../domains/products/pages/ProductsPage'
import { ProductDetailPage } from '../../domains/products/pages/ProductDetailPage'
import { LoginPage } from '../../domains/auth/pages/LoginPage'
import { RegisterPage } from '../../domains/auth/pages/RegisterPage'
import { CartPage } from '../../domains/cart/pages/CartPage'
import { CheckoutPage } from '../../domains/cart/pages/CheckoutPage'
import { OrdersPage } from '../../domains/orders/pages/OrdersPage'
import { OrderDetailPage } from '../../domains/orders/pages/OrderDetailPage'
import { ProfilePage } from '../../domains/auth/pages/ProfilePage'
import { ProtectedRoute } from '../../domains/auth/components/ProtectedRoute'
import { NotFoundPage } from '../../shared/components/feedback/NotFoundPage'

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="cart" element={<CartPage />} />

        {/* Protected routes */}
        <Route path="checkout" element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path="orders" element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        } />
        <Route path="orders/:id" element={
          <ProtectedRoute>
            <OrderDetailPage />
          </ProtectedRoute>
        } />
        <Route path="profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}