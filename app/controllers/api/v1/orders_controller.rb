class Api::V1::OrdersController < ApplicationController
  def create
    ActiveRecord::Base.transaction do
      cart_items = Cart.includes(:product, :user).where(id: params[:cartIds])

      if cart_items.empty?
        render json: { error: 'No cart items found' }, status: :unprocessable_entity
        return
      end

      customer = cart_items.first.user&.customer
      if customer.nil?
        render json: { error: 'Please log in to place an order' }, status: :unauthorized
        return
      end

      customer_id = customer.id

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

      OrderMailer.confirmation(order).deliver_later

      render json: { message: 'Order created successfully', order_id: order.id }, status: :created
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def latest
    customer = current_user&.customer
    return render json: { error: 'Not authenticated' }, status: :unauthorized if customer.nil?

    order = Order.includes(:payment, :shipment, order_items: { product: :image })
                 .where(customer_id: customer.id)
                 .order(created_at: :desc)
                 .first

    return render json: { error: 'No orders found' }, status: :not_found if order.nil?

    digits = order.payment.card_number.gsub(/\D/, '')
    masked_card = "**** **** **** #{digits.last(4)}"

    render json: {
      id:           order.id,
      cost_price:   order.cost_price.to_f,
      tax:          order.tax.to_f,
      courier_cost: order.courier_cost.to_f,
      total:        order.total.to_f,
      created_at:   order.created_at,
      payment: {
        card_name:   order.payment.card_name,
        card_number: masked_card
      },
      shipping: {
        full_name:   order.shipment.full_name,
        address:     order.shipment.address,
        city:        order.shipment.city,
        postal_code: order.shipment.postal_code,
        country:     order.shipment.country
      },
      items: order.order_items.map { |item|
        {
          product_name: item.product.image.image_name,
          quantity:     item.quantity,
          price:        item.price.to_f
        }
      }
    }
  end
end
