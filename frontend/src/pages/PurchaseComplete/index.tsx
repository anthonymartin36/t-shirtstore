import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getLatestOrderApi } from '../../apis/orders'
import PageLayout from '../../components/PageLayout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const PurchaseComplete: React.FC = () => {

const [darkMode, setDarkMode] = React.useState(true)
  const { data: order, isLoading, isError } = useQuery({
    queryKey: ['latestOrder'],
    queryFn: getLatestOrderApi,
  })

  return (
    <PageLayout>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
      <div className="w-full max-w-lg rounded-lg shadow-md p-8 bg-[var(--surface-color)]">
        <h1 className="text-2xl font-bold mb-1">Purchase Complete!</h1>
        <p className="text-sm mb-6">Thank you for your order. A confirmation has been recorded below.</p>

        {isLoading && <p className="text-xs">Loading order details...</p>}
        {isError && <p className="text-xs text-red-500">Could not load order details.</p>}

        {order && (
          <>
            <div className="flex justify-between text-xs mb-4">
              <span className="font-medium">Order #{order.id}</span>
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
            </div>

            {/* Items */}
            <div className="mb-4">
              <h2 className="text-sm font-semibold mb-2">Items</h2>
              <ul className="space-y-1">
                {order.items.map((item, i) => (
                  <li key={i} className="flex justify-between text-xs">
                    <span>{item.product_name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cost breakdown */}
            <div className="border-t border-gray-300 pt-3 mb-4 space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.cost_price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${order.courier_cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-sm pt-1 border-t border-gray-300">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping */}
            <div className="mb-4">
              <h2 className="text-sm font-semibold mb-1">Shipping To</h2>
              <p className="text-xs">{order.shipping.full_name}</p>
              <p className="text-xs">{order.shipping.address}</p>
              <p className="text-xs">{order.shipping.city}, {order.shipping.postal_code}</p>
              <p className="text-xs">{order.shipping.country}</p>
            </div>

            {/* Payment */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold mb-1">Payment</h2>
              <p className="text-xs">{order.payment.card_name}</p>
              <p className="text-xs">{order.payment.card_number}</p>
            </div>
          </>
        )}

        <Link
          to="/"
          className="inline-block bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
    <Footer />
    </PageLayout>
  )
}

export default PurchaseComplete
