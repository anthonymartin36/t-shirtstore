import api from './request'
import { WishlistType, WishlistTypeWithProductextendImage } from '../types/wishlist'
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
export type WishlistTypeWithProductID = {
  wishlistid: number
  quantity: number
}

// GET all wishlists (/api/v1/wishlists)
export async function getAllWishlistApi(): Promise<[WishlistTypeWithProductextendImage]> {
  try {
    const response = await api.get(`${rootUrl}/wishlists`)
    return response.body
  } catch (error) {
    throw console.error('Error fetching Wishlists', error)
  }
}

// GET a wishlist (/api/v1/wishlists/:id)
export async function getAWishlistApi(id: Number): Promise<WishlistTypeWithProductextendImage> {
  try {
    const response = await api.get(`${rootUrl}/wishlists/${id}`)
    return response.body
  } catch (error) {
    throw console.error('Error fetching a Wishlist', error)
  }
}

// ADD to wishlists (/api/v1/wishlists/)
export async function addToWishlistApi( NewWishlist: WishlistType ) {
  try {
    const response = await api
      .post(`${rootUrl}/wishlists/`)
      .send(NewWishlist)
    console.log("New Wishlist : ", NewWishlist, " Response : ", response.body )
    return response.body
  } catch (error) {
    throw console.error(`Error adding to Wishlists `, error)
  }
}

// Move wishlist item to cart (/api/v1/wishlists/:id/cart)
export async function addFromWishlistToCartApi( id: Number ) {
  try {
    const response = await api
      .post(`${rootUrl}/wishlists/${id}/cart`)
    return response.body
  } catch (error) {
    throw console.error(`Error adding to Wishlists `, error)
  }
}

// GET wishlist quantity (/api/v1/wishlists/:id/quantity)
export async function getWishlistQuantityApi(id: number): Promise<QuantityType> {
  try {
    const response = await api.get(`${rootUrl}/wishlists/${id}/quantity`)
    return response.body
  } catch (error) {
    throw console.error('Error fetching Quantity from Wishlist item', error)
  }
}

// Update Quantity on wishlist item (/api/v1/wishlists/:id/update_quantity)
export async function updateWishlistQuantityApi(id: number, quantity: any): Promise<Quantity2Type> {
  try {
    const response = await api
      .patch(`${rootUrl}/wishlists/${id}/update_quantity`)
      .send(quantity)
    return response.body
  } catch (error) {
    throw console.error('Error adding to Wishlists item quantity', error)
  }
}

// Get Wishlist by product ID (/api/v1/wishlists/product/:productId)
export async function getWishlistByProductIdApi(productId: number): Promise<WishlistTypeWithProductID> {
  try {
     const response = await api.get(`${rootUrl}/wishlists/product/${productId}`)
     console.log("Calling API URL:", response.body)
     return response.body
   } catch (error) {
     throw console.error('Error fetching Wishlist by product ID', error)
   }
 }
