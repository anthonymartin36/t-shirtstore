import api from './request'
import { OrderConfirmation, OrderPayload } from '../pages/ProductCategory/types'
const rootUrl = import.meta.env.VITE_NODE_API_URL + '/api/v1'

export async function getLatestOrderApi(): Promise<OrderConfirmation> {
  const response = await api.get(`${rootUrl}/orders/latest`)
  return response.body
}

export async function createOrderApi(payload: OrderPayload) {
  try {
    console.log('Creating order with payload:', payload)
    const response = await api
      .post(`${rootUrl}/orders`)
      .send(payload)
    return response.body
  } catch (error) {
    console.error('Error creating order', error)
    throw error
  }
}

