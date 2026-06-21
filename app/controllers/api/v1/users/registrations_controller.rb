module Api
  module V1
    class Users::RegistrationsController < Devise::RegistrationsController
      respond_to :json

      private

      def sign_up_params
        params.permit(:name, :email, :password)
      end

      def account_update_params
        params.permit(:name, :email, :password, :current_password)
      end
    end
  end
end