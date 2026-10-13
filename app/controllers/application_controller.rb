class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :set_guest_token

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

  def guest_token
    cookies[:guest_token]
  end

  def current_customer_id
    current_customer&.id
  end
end
