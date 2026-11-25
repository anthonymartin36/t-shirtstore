import { Route, 
    createBrowserRouter,
    createRoutesFromElements } from 'react-router-dom'
  
import Home from './src/pages/Home'
import Login from './src/pages/Login'
import Register from './src/pages/Register'
import App from './src/components/App'
import React from 'react'
import Product from './src/pages/Product'
import Cart from './src/pages/Cart'
import Wishlist from './src/pages/Wishlist'
import Checkout from './src/pages/Checkout'
import ForgotPassword from './src/pages/ForgotPassword'
import ResetPassword from './src/pages/ResetPassword'
import ConfirmEmail from './src/pages/ConfirmEmail'
import CustomerService from './src/pages/CustomerService'
import TrackOrder from './src/pages/TrackOrder'
import ReturnsExchanges from './src/pages/ReturnsExchanges'
import ShippingInfo from './src/pages/ShippingInfo'
import ProductCategory from './src/pages/ProductCategory'
import NotFound from './src/pages/NotFound'
import Account from './src/pages/Account'

const router = createBrowserRouter(
      createRoutesFromElements(
        <> 
        <Route path="/" element={<App />} >
            <Route index  element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="confirm-email" element={<ConfirmEmail />} />
            <Route path="customer-service" element={<CustomerService />} />
            <Route path="track-order" element={<TrackOrder />} />
            <Route path="returns-exchanges" element={<ReturnsExchanges />} />
            <Route path="shipping-info" element={<ShippingInfo />} />
            <Route path="products/:category" element={<ProductCategory />} />
            <Route path="product/:id?" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
        </Route>
      </>,
      )
    )

export default router