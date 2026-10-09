import React from 'react'
import { ShippingData } from '../../apis/orders'

interface Props {
    data: ShippingData
    onChange: (data: ShippingData) => void
}

const ShippingDetails: React.FC<Props> = ({ data, onChange }) => {
    const handle = (field: keyof ShippingData) =>
        (e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ ...data, [field]: e.target.value })

    return (
        <div className="p-3">
            <h4 className="text-sm font-bold mb-3">Shipping Address</h4>
            <form className="space-y-2" onSubmit={e => e.preventDefault()}>
                <div className="flex flex-col">
                    <label htmlFor="fullName" className="mb-1 text-xs font-medium">Full Name:</label>
                    <input
                        type="text" id="fullName" name="fullName" required
                        className="border border-gray-300 rounded-md p-1.5 text-xs w-full max-w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.fullName} onChange={handle('fullName')} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="address" className="mb-1 text-xs font-medium">Address:</label>
                    <input
                        type="text" id="address" name="address" required
                        className="border border-gray-300 rounded-md p-1.5 text-xs w-full max-w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.address} onChange={handle('address')} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="city" className="mb-1 text-xs font-medium">City:</label>
                    <input
                        type="text" id="city" name="city" required
                        className="border border-gray-300 rounded-md p-1.5 text-xs w-full max-w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.city} onChange={handle('city')} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="postalCode" className="mb-1 text-xs font-medium">Postal Code:</label>
                    <input
                        type="text" id="postalCode" name="postalCode" required
                        className="border border-gray-300 rounded-md p-1.5 text-xs w-full max-w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.postalCode} onChange={handle('postalCode')} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="country" className="mb-1 text-xs font-medium">Country:</label>
                    <input
                        type="text" id="country" name="country" required
                        className="border border-gray-300 rounded-md p-1.5 text-xs w-full max-w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.country} onChange={handle('country')} />
                </div>
            </form>
        </div>
    )
}

export default ShippingDetails
