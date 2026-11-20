class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: %i[show update destroy]

  # GET /products
  def index
    @products = Product.includes(:image, :category) # Eager load image and category associations

    render json: @products, include: [:image, :category] # Include associated data in the JSON response
  end

  # GET /products/1
  def show
    render json: @product , include: [:image, :category] # Include associated data in the JSON response
  end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy!
  end

  private

  def set_product
    @product = Product.find(params.expect(:id))
  end

  def product_params
    params.expect(product: [ :SKU, :description, :price, :stock, :size, :colour ])
  end
end
