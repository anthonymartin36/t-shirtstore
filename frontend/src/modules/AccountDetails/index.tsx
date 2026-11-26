import React from 'react'
import CustomerDetails from './CustomerDetails'
import PaymentDetails from './PaymentDetails'
import ShippingDetails from './ShippingDetails'
import PreviousPurchases from './PreviousPurchases'
import AccountStatus  from './AccountStatus'

const AccountDetails: React.FC = () => {
  return (
    <div>
      <main className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Account Details</h1>
        <p className="mb-4">
          Account Details here
        </p>
        <div className="rounded-lg p-6 space-y-4" style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--text-color)', opacity: 0.9 }}>
          
          <CustomerDetails />

          <PaymentDetails />

          <ShippingDetails />

          <PreviousPurchases />
          
          <AccountStatus />

        </div>
      </main>
    </div>
  )
}

export default AccountDetails
