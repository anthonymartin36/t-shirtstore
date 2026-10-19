import api from './request'
import { CartTypeWithProductextendImage } from '../modules/Cart/types'
const rootUrl = import.meta.env.VITE_NODE_API_URL + '/api/v1'

type QuantityType = {
    id: number
}

type Quantity2Type = {
  id: number
  quantity: {
    quantity: number
  }
}

type CartType = {
  quantity: number
  product_id: number
}

// GET all carts (/api/v1/carts)
export async function getAllCartApi(): Promise<[CartTypeWithProductextendImage]> {
  try {
    const response = await api.get(`${rootUrl}/carts`)
    return response.body
  } catch (error) {
    throw console.error('Error fetching Carts', error)
  }
}

// GET a carts (/api/v1/carts/:id)
export async function getACartApi(id: Number): Promise<CartTypeWithProductextendImage> {
  try {
    const response = await api.get(`${rootUrl}/carts/${id}`)
    return response.body
  } catch (error) {
    throw console.error('Error fetching a Cart', error)
  }
}

// ADD a cart item (/api/v1/carts/)
export async function addToCartApi( cartData: CartType ) {
  try {
    const response = await api
      .post(`${rootUrl}/carts/`)
      .send(cartData)
    return response.body
  } catch (error) {
    throw console.error(`Error adding to Cart `, error)
  }
}

// GET cart quantity (/api/v1/carts/:id/quantity)
export async function getCartQuantityApi(id: number): Promise<QuantityType> {
  try {
    const response = await api.get(`${rootUrl}/carts/${id}/quantity`)
    return response.body
  } catch (error) {
    throw console.error('Error fetching Quantity from Cart item', error)
  }
}

// Update Quantity to Cart item (/api/v1/carts/:id/update_quantity)
export async function updateCartQuantityApi(id: number, quantity: any): Promise<Quantity2Type> {
  try {
    const response = await api
      .patch(`${rootUrl}/carts/${id}/update_quantity`)
      .send(quantity)
    return response.body
  } catch (error) {
    throw console.error('Error adding to Cart item quantity', error)
  }
}
