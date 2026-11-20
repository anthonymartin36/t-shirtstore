class Customer < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Allowlist

  devise :database_authenticatable, :registerable, :recoverable, :validatable,
         :confirmable, :jwt_authenticatable, jwt_revocation_strategy: self

  belongs_to :user

  before_create :skip_confirmation_for_oauth

  has_many :orders
  has_many :password_reset_requests, dependent: :destroy

  private

  def skip_confirmation_for_oauth
    skip_confirmation! if provider.present?
  end

  public

  def on_jwt_dispatch(token, payload)
    allowlisted_jwts.create!(
      jti: payload['jti'],
      aud: payload['aud'].to_s,
      exp: Time.at(payload['exp'].to_i)
    )
  rescue => e
    raise
  end
end
