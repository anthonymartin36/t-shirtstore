import React from 'react'
import { PaymentData } from '../../apis/orders'

interface Props {
    data: PaymentData
    onChange: (data: PaymentData) => void
}

const PaymentDetails: React.FC<Props> = ({ data, onChange }) => {
    const handle = (field: keyof PaymentData) =>
        (e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ ...data, [field]: e.target.value })

    return (
        <div className="p-3">
            <h2 className="text-sm font-bold mb-3">Payment Information</h2>
            <form className="space-y-2" onSubmit={e => e.preventDefault()}>
                <div className="flex flex-col">
                    <label htmlFor="cardName" className="mb-1 text-xs font-medium">Name of Cardholder:</label>
                    <input
                        className="border border-gray-300 rounded-md p-1.5 text-xs w-full max-w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text" id="cardName" name="cardName" required
                        value={data.cardName} onChange={handle('cardName')} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="cardNumber" className="mb-1 text-xs font-medium">Card Number:</label>
                    <input
                        className="border border-gray-300 rounded-md p-1.5 text-xs w-full max-w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text" id="cardNumber" name="cardNumber" required
                        value={data.cardNumber} onChange={handle('cardNumber')} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="expiryDate" className="mb-1 text-xs font-medium">Expiry Date:</label>
                    <input
                        className="border border-gray-300 rounded-md p-1.5 text-xs w-full max-w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text" id="expiryDate" name="expiryDate" required
                        value={data.expiryDate} onChange={handle('expiryDate')} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="cvv" className="mb-1 text-xs font-medium">CVV:</label>
                    <input
                        className="border border-gray-300 rounded-md p-1.5 text-xs w-full max-w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text" id="cvv" name="cvv" required
                        value={data.cvv} onChange={handle('cvv')} />
                </div>
            </form>
        </div>
    )
}

export default PaymentDetails
