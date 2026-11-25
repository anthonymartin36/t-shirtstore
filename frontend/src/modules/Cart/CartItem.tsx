import React, { useState, useEffect } from 'react' //useRef
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCartQuantityApi } from '../../apis/cart'

interface CartItemProps {
    id: number
    quantity: number
}

const CartItem: React.FC<CartItemProps> = ({ id, quantity }) => {
  const [buttonValue, setButtonValue] = useState(quantity)
  //const isMounted = useRef(false)

  // Access the query client to invalidate or update the cart query
  const queryClient = useQueryClient()

  // Define the mutation for updating the cart quantity
  const { mutate: updateQuantityMutation } = useMutation<
  any, // The type of the data returned by the mutation (if any)
  Error, // The type of the error
  { quantity: any } // The type of the variables passed to the mutation function
  >({
      mutationKey: ['updateCartQuantity', id], // Unique key for the mutation
      mutationFn: async ({ quantity }: { quantity: number }) => {
          await updateCartQuantityApi(id, { quantity: quantity } )
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['carts'] });
      },
      onError: (error) => {
        console.error('Error updating cart quantity:', error);
  }})

  // Handle button clicks to update the quantity
  const handleDecrement = () => {
    setButtonValue(prevCount => prevCount - 1) // Pass the correct argument
  }

  const handleIncrement = () => {
    setButtonValue(prevCount => prevCount + 1)// Pass the correct argument
  }
  useEffect(() => {
    // if (!isMounted.current) {
    //   isMounted.current = true
    //   return
    // }
    updateQuantityMutation({ quantity: buttonValue })
  }, [buttonValue])

  return (
    <div key={`${id}`} id={`${id}`} className="flex w-full bg-gray-100 items-center font-medium justify-between py-1.5 px-3 rounded-md">
      <button
        className="items-center justify-center bg-red-400 hover:bg-red-600 text-white font-bold w-14 h-6 rounded-md"
        onClick={handleDecrement}
      >
        -
      </button>
      <span> {buttonValue} </span>
      <button
        className="items-center justify-center bg-red-400 hover:bg-red-600 text-white font-bold w-14 h-6 rounded-md"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  )
}

export default CartItem