import React from 'react'
import PageLayout from '../../components/PageLayout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const TrackOrder: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(true)

  return (
    <PageLayout darkMode={darkMode}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Track Your Order</h1>
        <p className="text-gray-600 mb-4">
          Enter your order number below to get a live status update on your shipment.
        </p>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Order Tracking</h2>
            <p className="text-gray-600 mt-1">Coming soon — order tracking will be available here.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Estimated Delivery</h2>
            <p className="text-gray-600 mt-1">Coming soon — delivery estimates will appear here.</p>
          </div>
        </div>
      </main>
      <Footer />
    </PageLayout>
  )
}

export default TrackOrder
