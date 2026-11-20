class Api::V1::Customers::PasswordsController < Devise::PasswordsController
  respond_to :json

  # POST /api/v1/reset_password
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)

    if successfully_sent?(resource)
      PasswordResetRequest.create!(
        customer:     resource,
        requested_at: Time.current,
        ip_address:   request.remote_ip
      )
      render json: { message: 'Reset password instructions have been sent to your email.' }, status: :ok
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /api/v1/reset_password
  def update
    self.resource = resource_class.reset_password_by_token(resource_params)

    if resource.errors.empty?
      PasswordResetRequest
        .where(customer: resource)
        .order(requested_at: :desc)
        .first&.update!(completed_at: Time.current)
      render json: { message: 'Password updated successfully.' }, status: :ok
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def resource_params
    params.require(:customer).permit(:email, :reset_password_token, :password, :password_confirmation)
  end
end
