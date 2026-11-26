import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import ShippingDetails from '../../modules/Checkout/ShippingDetails'
import CheckoutCart from '../../modules/Checkout/CheckoutCart'
import PaymentDetails from '../../modules/Checkout/PaymentDetails'
import CheckoutButtons from '../../modules/Checkout/CheckOutButtons'
import { PaymentData, ShippingData } from '../../pages/ProductCategory/types'
import {createOrderApi} from '../../apis/orders'
import { getAllCartApi } from '../../apis/cart'

const CheckoutDetails: React.FC = () => {
    const navigate = useNavigate()
    const [paymentData, setPaymentData] = useState<PaymentData>({
        cardName: '', cardNumber: '', expiryDate: '', cvv: ''
    })
    const [shippingData, setShippingData] = useState<ShippingData>({
        fullName: '', address: '', city: '', postalCode: '', country: ''
    })
    const [orderError, setOrderError] = useState<string | null>(null)

    const { data: carts, isLoading, isError } = useQuery({
        queryKey: ['carts'],
        queryFn: () => getAllCartApi(),
    })

    const cartIds = carts?.map(cart => cart.id) ?? []

    const costPrice = Number((carts?.reduce((acc, cart) => acc + Number(cart.product.price) * cart.quantity, 0) ?? 0).toFixed(2))
    const tax = Number((costPrice * 0.15).toFixed(2))
    const courierCost = 5.60
    const total = Number((costPrice + tax + courierCost).toFixed(2))

    const handlePlaceOrder = async (cartIds: number[]) => {
        setOrderError(null)
        try {
            await createOrderApi({
                payment: paymentData,
                shipping: shippingData,
                cartIds,
                order: { costPrice, tax, courierCost, total }
            })
            navigate('/purchase-complete')
        } catch (err: any) {
            const message = err?.response?.body?.error ?? 'Failed to place order. Please try again.'
            setOrderError(message)
        }
    }

    return (
        <div className="">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="lg:w-2/3 min-w-0 flex flex-col gap-2">
                    <div className="flex flex-col md:flex-row gap-2 rounded-lg bg-[var(--surface-color)] [box-shadow:0_4px_6px_-1px_rgba(0,0,0,0.1),0_8px_12px_-2px_rgba(0,0,0,0.08)]">
                        <div className="flex-1 min-w-0">
                            <PaymentDetails data={paymentData} onChange={setPaymentData} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <ShippingDetails data={shippingData} onChange={setShippingData} />
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/3 min-w-0">
                    {isLoading && <p className="text-xs p-4">Loading cart...</p>}
                    {isError && <p className="text-xs p-4">Failed to load cart.</p>}
                    {carts && <CheckoutCart carts={carts} />}
                </div>
            </div>
            {orderError && (
                <p className="text-red-500 text-xs text-center mt-2">{orderError}</p>
            )}
            <CheckoutButtons onPlaceOrder={handlePlaceOrder} cartIds={cartIds} />
        </div>
    )
}

export default CheckoutDetails
