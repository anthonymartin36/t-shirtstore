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

const router = createBrowserRouter(
      createRoutesFromElements(
        <> 
        <Route path="/" element={<App />} >
            <Route index  element={<Home />} />
            <Route path="Register" element={<Register />} />
            <Route path="Login" element={<Login />} />
            <Route path="ForgotPassword" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="confirm-email" element={<ConfirmEmail />} />
            <Route path="customer-service" element={<CustomerService />} />
            <Route path="track-order" element={<TrackOrder />} />
            <Route path="returns-exchanges" element={<ReturnsExchanges />} />
            <Route path="shipping-info" element={<ShippingInfo />} />
            <Route path="Products/:id" element={<Product />} />
            <Route path="Cart" element={<Cart />} />
            <Route path="Wishlist" element={<Wishlist />} />
            <Route path="Checkout" element={<Checkout />} />
        </Route>
      </>,
      )
    )

export default router