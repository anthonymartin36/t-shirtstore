import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../apis/request'

const rootUrl = import.meta.env.VITE_NODE_API_URL + '/api/v1'

type SubscribeStatus = 'idle' | 'loading' | 'success' | 'error'

const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [status, setStatus] = useState<SubscribeStatus>('idle')
  const [serverError, setServerError] = useState('')

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const handleBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address.')
    } else {
      setEmailError('')
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setStatus('loading')
    setServerError('')
    try {
      await api.post(`${rootUrl}/newsletter_subscriptions`).send({ email })
      setStatus('success')
      setEmail('')
    } catch (err: any) {
      const message = err?.response?.body?.errors?.[0] ?? 'Something went wrong. Please try again.'
      setServerError(message)
      setStatus('error')
    }
  }

  return (
    <footer className="bg-stone-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">T-Shirt Shop</h3>
          <p className="text-gray-400">Premium quality clothing for everyone. Designed for comfort and style.</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/products/tshirt" className="hover:text-white">Plain T-Shirts</Link></li>
            <li><Link to="/products/raglan" className="hover:text-white">Raglan T-Shirts</Link></li>
            <li><Link to="/products/polo" className="hover:text-white">Polo T-Shirts</Link></li>
            <li><Link to="/products/vneck" className="hover:text-white">V-Neck T-Shirts</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Help</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/customer-service" className="hover:text-white">Customer Service</Link></li>
            <li><Link to="/track-order" className="hover:text-white">Track Order</Link></li>
            <li><Link to="/returns-exchanges" className="hover:text-white">Returns &amp; Exchanges</Link></li>
            <li><Link to="/shipping-info" className="hover:text-white">Shipping Info</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-4">Subscribe for updates and exclusive offers.</p>

          {status === 'success' ? (
            <p className="text-green-400 text-sm font-medium">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} noValidate>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleBlur}
                  className="bg-amber-50 px-4 py-2 w-full rounded-l text-gray-900 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-black px-4 py-2 rounded-r hover:bg-gray-800 disabled:opacity-50 whitespace-nowrap"
                >
                  {status === 'loading' ? '...' : 'Subscribe'}
                </button>
              </div>
              {emailError && (
                <p className="text-red-400 text-xs mt-1">{emailError}</p>
              )}
              {serverError && (
                <p className="text-red-400 text-xs mt-1">{serverError}</p>
              )}
            </form>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400">© 2025 T-Shirt Shop. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-pinterest-p"></i></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
