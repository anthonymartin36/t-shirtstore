import React from 'react'
import PageLayout from '../../components/PageLayout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const ShippingInfo: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(true)

  return (
    <PageLayout darkMode={darkMode}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Shipping Info</h1>
        <p className="text-gray-600 mb-4">
          Find out everything you need to know about our shipping options, times, and costs.
        </p>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Shipping Options</h2>
            <p className="text-gray-600 mt-1">Coming soon — available shipping methods will be listed here.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Delivery Times</h2>
            <p className="text-gray-600 mt-1">Coming soon — estimated delivery timeframes will appear here.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Shipping Costs</h2>
            <p className="text-gray-600 mt-1">Coming soon — pricing by region will appear here.</p>
          </div>
        </div>
      </main>
      <Footer />
    </PageLayout>
  )
}

export default ShippingInfo
