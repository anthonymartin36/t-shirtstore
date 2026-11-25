import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CartItem from '../Cart/CartItem'
import { useQuery } from '@tanstack/react-query'
import { addToCartApi, getCartByProductIdApi } from '../../apis/cart'

interface CartButtonProps {
    productId: number;
}

const CartButton: React.FC<CartButtonProps> = ({ productId }) => {
    const queryClient = useQueryClient()
    const NewCart= { product_id: productId, customer_id: 1, quantity: 1 }
    const [CartMember, setCartMember] = React.useState<{ cartid: number, quantity: number } | null>(null)
    const { 
        data: Cart,
    } = useQuery<{ cartid: number; quantity: number }>({
        queryKey: ['carts', productId],
        queryFn: async () => {
            const member = await getCartByProductIdApi(productId)
            setCartMember({ cartid: member.cartid, quantity: member.quantity })
            return member
        },
    })

    const { mutate: addToCart } = useMutation({
        mutationFn: async (CartItem: any) => {
            await addToCartApi(CartItem)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts'] })
        },
    })

    const handleAddToCart = () => {
        addToCart(NewCart)
    }


    if (Cart && CartMember && CartMember.cartid != 0) {
        //console.log('CartMember : ', CartMember?.cartid, 'quantity : ', CartMember?.quantity)
        return (
            <div className="w-full">
            <CartItem id={Cart?.cartid} quantity={Cart?.quantity} />
            </div>
        )
    }
    return (
        <button 
            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-md hover:bg-red-500"
            onClick={()=> handleAddToCart()}
            >
            Add to Cart
        </button>
    )
}

export default CartButton