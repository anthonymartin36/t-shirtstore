import React from 'react';
import { CartTypeWithProductextendImage } from '../Cart/types'
import CartCalculation from '../Cart/CartCalculation'
interface Props {
  carts: CartTypeWithProductextendImage[]
}

const CheckoutCart: React.FC<Props> = ({ carts }) => {
  const total = carts.reduce(
    (acc, cart) => acc + cart.product.price * cart.quantity,
    0
  )

  return (
    <div className="p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
      <div className="mb-4">
        <ul>
          {carts.map((cart: CartTypeWithProductextendImage) => (
            <li key={cart.id} className="flex justify-between py-1 text-sm text-gray-700 w-full">
              <span className="w-1/2 text-left">{cart.product.image.image_name}</span>
              <span className="w-1/2 text-right">
                {cart.quantity > 1
                  ? `${cart.quantity} × $${cart.product.price} = $${(cart.quantity * cart.product.price).toFixed(2)}`
                  : `$${cart.product.price}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
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
