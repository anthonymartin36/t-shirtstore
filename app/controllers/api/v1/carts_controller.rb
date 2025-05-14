class Api::V1::CartsController < ApplicationController
  before_action :set_cart, only: %i[show update destroy quantity update_quantity]
  
  # GET /carts
  def index
    @carts = Cart.includes(product: :image)

    render json: @carts, include: { product: { include: :image } } # Include the image in the JSON
  end

  # GET /carts/1
  def show
    render json: @cart
  end

  # POST /carts
  def create
    @cart = Cart.new(cart_params)

    if @cart.save
      render json: @cart, status: :created, location: @cart
    else
      render json: @cart.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /carts/1
  def update
    if @cart.update(cart_params)
      render json: @cart
    else
      render json: @cart.errors, status: :unprocessable_entity
    end
  end

  # DELETE /carts/1
  def destroy
    @cart.destroy!
  end
  

  # GET /api/v1/carts/:id/quantity
  def quantity
    render json: { quantity: @cart.quantity }, status: :ok
  end

  # PATCH /api/v1/carts/:id/update_quantity
  def update_quantity
    new_quantity = params[:quantity].to_i # Get the new quantity from the request
    Rails.logger.info "New quantity value: #{new_quantity}" # Log the new_quantity value
    # the body json needs to be added to the quality data fieldnpm run 

    if new_quantity <= 0
      @cart.destroy! # Delete the cart item if the quantity is 0 or less
      render json: { message: "Cart item deleted" }, status: :ok
    elsif  @cart.update(quantity: new_quantity)
      render json: { quantity: @cart.quantity }, status: :ok # Return the updated quantity
    else
      render json: @cart.errors, status: :unprocessable_entity # Handle validation errors
    end
  end
  

  private
    # Use callbacks to share common setup or constraints between actions.
  def set_cart
    @cart = Cart.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
 
  def quantity_params
    params.expect(quantity: [ :quantity ])
  end

  def cart_params
    params.require(:cart).permit(:quantity, :customer_id, :product_id)
  end
end
