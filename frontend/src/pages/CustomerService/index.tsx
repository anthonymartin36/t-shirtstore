import React from 'react'
import PageLayout from '../../components/PageLayout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const CustomerService: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(true)

  return (
    <PageLayout darkMode={darkMode}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Customer Service</h1>
        <p className="text-gray-600 mb-4">
          Our customer service team is here to help you with any questions or concerns about your order.
        </p>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Contact Us</h2>
            <p className="text-gray-600 mt-1">Coming soon — contact details will be listed here.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Opening Hours</h2>
            <p className="text-gray-600 mt-1">Coming soon — support hours will be listed here.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">FAQs</h2>
            <p className="text-gray-600 mt-1">Coming soon — frequently asked questions will appear here.</p>
          </div>
        </div>
      </main>
      <Footer />
    </PageLayout>
  )
}

export default CustomerService
