import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "productos",
        element: <ProductsPage />
      },
      {
        path: "productos/:id",
        element: <ProductDetailPage />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "registro",
        element: <RegisterPage />
      },
      {
        path: "carrito",
        element: <CartPage />
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        )
      },
      {
        path: "pedidos",
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        )
      },
      {
        path: "pedidos/:id",
        element: (
          <ProtectedRoute>
            <OrderDetailPage />
          </ProtectedRoute>
        )
      },
      {
        path: "perfil",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ]
  }
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}