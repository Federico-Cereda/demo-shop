import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ShopPage } from "./pages/shop/ShopPage"
import { CMSPage } from "./pages/cms/CMSPage"
import { CartPage } from "./pages/cart/CartPage"
import { NavBar } from "./shared"
import { Checkout } from "./pages/cart/Checkout"
import { LoginPage } from "./pages/login/LoginPage"
import { PrivateRoute } from "./shared/auth/PrivateRoute"

function App() {

  return (
    <BrowserRouter>
    <NavBar />

    <div className="page">
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="cms" element={<PrivateRoute><CMSPage /></PrivateRoute>} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="*" element={<Navigate to="shop" />} />
      </Routes>
    </div>

    </BrowserRouter>
  )
}

export default App
