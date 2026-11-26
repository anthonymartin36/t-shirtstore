class OrderMailer < ApplicationMailer
  default from: 'tshirtshoprr@gmail.com'

  def confirmation(order)
    @order    = Order.includes(:payment, :shipment, order_items: { product: :image }).find(order.id)
    @customer = @order.customer
    @items    = @order.order_items
    @payment  = @order.payment
    @shipment = @order.shipment

    digits         = @payment.card_number.gsub(/\D/, '')
    @masked_card   = "**** **** **** #{digits.last(4)}"

    mail(
      to:      @customer.email,
      subject: "Order Confirmation ##{@order.id} — T-Shirt Store"
    )
  end
end
