import { PaymentData, ShippingData, OrderData } from '../../apis/orders'

export type CheckoutPayload = {
  payment: PaymentData
  shipping: ShippingData
  cartIds: number[]
  order: OrderData
}
