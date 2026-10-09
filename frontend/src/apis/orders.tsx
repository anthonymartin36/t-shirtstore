import request from 'superagent'

const rootUrl = import.meta.env.VITE_NODE_API_URL + '/api/v1'

export type PaymentData = {
  cardName: string
  cardNumber: string
  expiryDate: string
  cvv: string
}

export type ShippingData = {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
}

export type OrderData = {
  costPrice: number
  tax: number
  courierCost: number
  total: number
}

export type OrderPayload = {
  payment: PaymentData
  shipping: ShippingData
  cartIds: number[]
  order: OrderData
}

export async function createOrderApi(payload: OrderPayload) {
  try {
    console.log('Creating order with payload:', payload)
    const response = await request
      .post(`${rootUrl}/orders`)
      .send(payload)
    return response.body
  } catch (error) {
    throw console.error('Error creating order', error)
  }
}
