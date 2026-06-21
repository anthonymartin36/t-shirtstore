module Api
    module V1
      class SessionsController < Devise::SessionsController
        respond_to :json
  
        private

        # def create
        #   Rails.logger.info "Parameters: #{params.inspect}"
        #   super
        # end

        def respond_with(resource, _opts = {})
          Rails.logger.info "Responding with resource: #{resource.inspect}" # Log the resource for debugging
          if resource.persisted?
            render json: {
              status: { code: 200, message: 'Logged in successfully.' },
              data: resource
            }, status: :ok
          else
            render json: {
              status: { code: 401, message: 'Invalid login credentials.' }
            }, status: :unauthorized
          end
        end
  
        def respond_to_on_destroy
          Rails.logger.info "Responding on destroy: #{resource.inspect}" # Log the resource for debugging
          
          if current_user
            render json: {
              status: { code: 200, message: 'Logged out successfully.' }
            }, status: :ok
          else
            render json: {
              status: { code: 401, message: 'No active session found.' }
            }, status: :unauthorized
          end
        end
      end
    end
  end