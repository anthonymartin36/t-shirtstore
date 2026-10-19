class Api::V1::Customers::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    Rails.logger.info ">>> RegistrationsController#create reached"
    Rails.logger.info ">>> sign_up_params: #{sign_up_params.inspect}"
    Rails.logger.info ">>> current_user: #{current_user.inspect}"
    build_resource(sign_up_params)
    resource.user = current_user
    resource.save
    Rails.logger.info ">>> resource errors: #{resource.errors.full_messages}"
    if resource.persisted?
      render json: { customer: resource }, status: :created
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotUnique
    render json: { errors: ['An account is already registered for this session. Please log in.'] }, status: :unprocessable_entity
  end

  private

  def sign_up_params
    params.require(:customer).permit(:name, :email, :password, :password_confirmation)
  end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { customer: resource }, status: :created
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
