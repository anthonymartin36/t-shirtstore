class Api::V1::Customers::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    super do |customer|
      GuestMerger.call(guest_token: cookies[:guest_token], customer: customer)
      cookies[:guest_token] = {
        value:   customer.user.guest_token,
        expires: 1.year.from_now,
        httponly: true,
        secure:  Rails.env.production?
      }
    end
  end

  def destroy
    super
  rescue JWT::DecodeError => e
    Rails.logger.warn "JWT revocation skipped — could not decode token: #{e.message}"
    respond_to_on_destroy
  end

  private

  def respond_with(customer, _opts = {})
    render json: { customer: customer.slice(:id, :email) }, status: :ok
  end

  def respond_to_on_destroy
    head :no_content
  end
end
