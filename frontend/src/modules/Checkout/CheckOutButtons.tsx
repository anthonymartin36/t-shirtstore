import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
    onPlaceOrder: (cartIds: number[]) => void
    cartIds: number[]
}

const CheckoutButtons: React.FC<Props> = ({ onPlaceOrder, cartIds }) => {
    const navigate = useNavigate()

    return (
        <div className="flex justify-center mt-4">
            <button
                type="button"
                onClick={() => onPlaceOrder(cartIds)}
                className="text-xs bg-blue-500 text-white font-medium m-3 py-1.5 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Place Order
            </button>
            <button
                type="button"
                onClick={() => navigate('/')}
                className="text-xs bg-blue-500 text-white font-medium m-3 py-1.5 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Return to Shopping
            </button>
        </div>
    )
}

export default CheckoutButtons
