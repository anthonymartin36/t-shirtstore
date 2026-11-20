class Api::V1::Customers::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    super do |customer|
      GuestMerger.call(guest_token: cookies[:guest_token], customer: customer)
      cookies.delete(:guest_token)
    end
  end

  private

  def respond_with(customer, _opts = {})
    render json: { customer: customer.slice(:id, :email) }, status: :ok
  end

  def respond_to_on_destroy
    head :no_content
  end
end
