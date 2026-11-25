class Api::V1::Customers::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    super do |customer|
      if customer.persisted?
        GuestMerger.call(guest_token: cookies[:guest_token], customer: customer)
        cookies[:guest_token] = {
          value:   customer.user.guest_token,
          expires: 1.year.from_now,
          httponly: true,
          secure:  Rails.env.production?
        }
      end
    end
  rescue ActiveRecord::RecordNotUnique
    render json: { errors: ['An account is already registered for this session. Please log in.'] }, status: :unprocessable_entity
  end

  protected

  def build_resource(hash = {})
    super
    resource.user ||= current_user
  end

  private

  def sign_up_params
    params.require(:customer).permit(:name, :email, :password, :password_confirmation)
  end

  def respond_with(customer, _opts = {})
    if customer.persisted?
      render json: { customer: customer.slice(:id, :email) }, status: :created
    else
      render json: { errors: customer.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
