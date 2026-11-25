import React from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../../components/PageLayout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const NotFound: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(true)

  return (
    <PageLayout>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mt-4">Page not found</h2>
        <p className="text-gray-500 mt-2 max-w-sm">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-500"
        >
          Back to home
        </Link>
      </main>
      <Footer />
    </PageLayout>
  )
}

export default NotFound
