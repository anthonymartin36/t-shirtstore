class Api::V1::Customers::GoogleController < ApplicationController
  before_action :verify_google_token, only: [:login]

  # POST /api/v1/glogin  { "id_token": "..." }
  # find or create — the frontend never needs to distinguish login from register
  def login
    customer = Customer.find_by(provider: "google", uid: @google["sub"])

    if customer
      complete_sign_in(customer, :ok)
    else
      # first time: link to an existing email/password account, or create fresh
      customer = Customer.find_by(email: @google["email"])
      if customer
        customer.update!(provider: "google", uid: @google["sub"])
      else
        customer = Customer.create!(
          email:    @google["email"],
          password: Devise.friendly_token[0, 20],
          provider: "google",
          uid:      @google["sub"]
        )
      end
      complete_sign_in(customer, :created)
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  # DELETE /api/v1/glogout  (with Authorization: Bearer ...)
  # devise-jwt revokes the token on this path before the action runs
  def logout
    head :no_content
  end

  private

  def verify_google_token
    @google = Auth0Token.verify!(params.require(:id_token))
  rescue Auth0Token::Invalid, ActionController::ParameterMissing
    render json: { error: "Invalid Google token" }, status: :unauthorized
  end

  def complete_sign_in(customer, status)
    GuestMerger.call(guest_token: cookies[:guest_token], customer: customer)
    cookies.delete(:guest_token)
    customer.touch(:updated_at)

    token, payload = Warden::JWTAuth::UserEncoder.new.call(customer, :customer, nil)
    Rails.logger.debug "[complete_sign_in] dispatching JWT jti=#{payload['jti']} for customer=#{customer.id}"
    customer.on_jwt_dispatch(token, payload)
    response.headers['Authorization'] = "Bearer #{token}"

    render json: { customer: customer.slice(:id, :email) }, status: status
  end
end
