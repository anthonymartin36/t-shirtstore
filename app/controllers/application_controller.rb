class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  before_action :set_guest_token
  before_action :set_current_user

  private

  def set_guest_token
    unless cookies[:guest_token]
      cookies[:guest_token] = {
        value:    SecureRandom.uuid,
        expires:  1.year.from_now,
        httponly: true,
        secure:   Rails.env.production?
      }
    end
  end

  def set_current_user 
    @current_user ||= User.find_or_create_by(guest_token: cookies[:guest_token])
  end

  def current_user
    @current_user
  end

  def current_customer
    @current_customer ||= warden.authenticate(scope: :customer)
  rescue StandardError
    nil
  end
end
