import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { getAllCartApi } from '../../apis/cart'
import { CartTypeWithProductextendImage } from '../Cart/types'
import CartCalculation from '../Cart/CartCalculation'

const CheckoutCart: React.FC = () => {
  const { data: carts, isLoading, isError } = useQuery({
    queryKey: ['carts'],
    queryFn: () => getAllCartApi(),
  })

  if (isError) {
    return <div className="float-right p-4 rounded-lg shadow-md w-80"><p>Failed to load cart.</p></div>
  }

  if (!carts || isLoading) {
    return <div className="float-right p-4 rounded-lg shadow-md w-80"><p>Loading...</p></div>
  }

  const total = carts.reduce(
    (acc, cart) => acc + cart.product.price * cart.quantity,
    0
  )

  return (
    <div className="float-right p-4 rounded-lg shadow-md w-80">
      <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
      <ul>
        {carts.map((cart: CartTypeWithProductextendImage) => (
          <li key={cart.id} className="flex justify-between py-1 text-sm text-gray-700">
            <span>{cart.product.image.image_name}</span>
            <span>
              {cart.quantity > 1
                ? `${cart.quantity} × $${cart.product.price} = $${(cart.quantity * cart.product.price).toFixed(2)}`
                : `$${cart.product.price}`}
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-200 mt-3 pt-1">
        <div className="flex justify-between text-sm font-medium">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <CartCalculation total={total} />
    </div>
  );
};

export default CheckoutCart;
