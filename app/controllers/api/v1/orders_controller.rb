class Api::V1::OrdersController < ApplicationController
  def create
    ActiveRecord::Base.transaction do
      cart_items = Cart.includes(:product).where(id: params[:cartIds])

      if cart_items.empty?
        render json: { error: 'No cart items found' }, status: :unprocessable_entity
        return
      end

      customer_id = cart_items.first.customer_id.to_i

      payment = Payment.create!(
        card_name:    params[:payment][:cardName],
        card_number:  params[:payment][:cardNumber],
        expiry_date:  params[:payment][:expiryDate],
        cvv:          params[:payment][:cvv],
        customer_id:  customer_id
      )

      shipment = Shipment.create!(
        full_name:    params[:shipping][:fullName],
        address:      params[:shipping][:address],
        city:         params[:shipping][:city],
        postal_code:  params[:shipping][:postalCode],
        country:      params[:shipping][:country],
        customer_id:  customer_id
      )

      order = Order.create!(
        customer_id:  customer_id,
        payment_id:   payment.id,
        shipment_id:  shipment.id,
        cost_price:   params[:order][:costPrice],
        tax:          params[:order][:tax],
        courier_cost: params[:order][:courierCost],
        total:        params[:order][:total]
      )

      cart_items.each do |cart_item|
        OrderItem.create!(
          order_id:   order.id,
          product_id: cart_item.product_id,
          quantity:   cart_item.quantity,
          price:      cart_item.product.price
        )
        cart_item.destroy!
      end

      render json: { message: 'Order created successfully', order_id: order.id }, status: :created
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end
end
