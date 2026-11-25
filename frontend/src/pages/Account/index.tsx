import React from 'react'
import PageLayout from '../../components/PageLayout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AccountDetails from '../../modules/AccountDetails'

const Account: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(true)

  return (
    <PageLayout>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <AccountDetails />
      <Footer />
    </PageLayout>
  )
}

export default Account
