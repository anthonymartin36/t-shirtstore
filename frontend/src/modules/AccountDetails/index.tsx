import React from 'react'

const AccountDetails: React.FC = () => {
  return (
    <div>
      <main className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Account Details</h1>
        <p className="mb-4">
          Account Details here
        </p>
        <div className="rounded-lg p-6 space-y-4" style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--text-color)', opacity: 0.9 }}>
          <div>
            <h2 className="text-lg font-semibold">Customer Account</h2>
            <p className="mt-1">Customer account details to be displayed here.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Payment Details</h2>
            <p className="mt-1">Customer Payment details to be displayed here.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Shipping Details</h2>
            <p className="mt-1">Customer Shipping details to be displayed here.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Previous Purchases Details</h2>
            <p className="mt-1">Customer Previous Purchases details to be displayed here.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Account Status</h2>
            <p className="mt-1">Account Status details to be displayed here (Active Suspended Delete).</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AccountDetails
