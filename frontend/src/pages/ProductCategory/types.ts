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
  
  export type OrderConfirmation = {
    id: number
    cost_price: number
    tax: number
    courier_cost: number
    total: number
    created_at: string
    payment: {
      card_name: string
      card_number: string
    }
    shipping: {
      full_name: string
      address: string
      city: string
      postal_code: string
      country: string
    }
    items: {
      product_name: string
      quantity: number
      price: number
    }[]
  }