import React from 'react'
import PageLayout from '../../components/PageLayout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const ReturnsExchanges: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(true)

  return (
    <PageLayout darkMode={darkMode}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Returns &amp; Exchanges</h1>
        <p className="text-gray-600 mb-4">
          We want you to love your purchase. If something isn't right, we make it easy to return or exchange.
        </p>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Return Policy</h2>
            <p className="text-gray-600 mt-1">Coming soon — return policy details will be listed here.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">How to Return</h2>
            <p className="text-gray-600 mt-1">Coming soon — step-by-step return instructions will appear here.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Exchanges</h2>
            <p className="text-gray-600 mt-1">Coming soon — exchange process information will appear here.</p>
          </div>
        </div>
      </main>
      <Footer />
    </PageLayout>
  )
}

export default ReturnsExchanges
