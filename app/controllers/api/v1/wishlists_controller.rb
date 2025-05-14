class Api::V1::WishlistsController < ApplicationController
  before_action :set_wishlist, only: %i[ show update destroy quantity update_quantity]

  # GET api/v1/wishlists
  def index
    @wishlists = Wishlist.includes(product: :image)

    render json: @wishlists, include: { product: { include: :image } }
  end

  # GET  api/v1/wishlists/1
  def show
    render json: @wishlist
  end

  # POST  api/v1/wishlists
  def create
    @wishlist = Wishlist.new(wishlist_params)

    if @wishlist.save
      render json: @wishlist, status: :created, location: @wishlist
    else
      render json: @wishlist.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT  api/v1/wishlists/1
  def update
    if @wishlist.update(wishlist_params)
      render json: @wishlist
    else
      render json: @wishlist.errors, status: :unprocessable_entity
    end
  end

  # DELETE  api/v1/wishlists/1
  def destroy
    @wishlist.destroy!
  end

  # GET /api/v1/wishlists/:id/quantity
  def quantity
    Rails.logger.info "Params: #{params.inspect}" # Log the params object
    render json: { quantity: @wishlist.quantity }, status: :ok
  end

  # PATCH /api/v1/wishlists/:id/update_quantity
  def update_quantity
    new_quantity = params[:quantity].to_i # Get the new quantity from the request
    Rails.logger.info "New quantity value: #{new_quantity}" # Log the new_quantity value
    # the body json needs to be added to the quality data fieldnpm run 

    if new_quantity <= 0
      @wishlist.destroy! # Delete the wishlist item if the quantity is 0 or less
      render json: { message: "wishlist item deleted" }, status: :ok
    elsif  @wishlist.update(quantity: new_quantity)
      render json: { quantity: @wishlist.quantity }, status: :ok # Return the updated quantity
    else
      render json: @wishlist.errors, status: :unprocessable_entity # Handle validation errors
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_wishlist
    @wishlist = Wishlist.find(params[:id])
  end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Wishlist not found" }, status: :not_found
  end
  
  def quantity_params
    params.expect(quantity: [ :quantity ])
  end

  # Only allow a list of trusted parameters through.
  def wishlist_params
    params.expect(wishlist: [ :quantity, :customer_id, :product_id ])
  end

