class NewsletterSubscription < ApplicationRecord
  validates :email, presence: true,
                    format: { with: URI::MailTo::EMAIL_REGEXP, message: 'is not a valid email address' },
                    uniqueness: { case_sensitive: false, message: 'is already subscribed' }

  before_validation { self.email = email&.downcase&.strip }
  before_create { self.subscribed_at = Time.current }
end
