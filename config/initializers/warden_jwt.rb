Rails.application.config.after_initialize do
  Warden::JWTAuth.config.decoding_secret = ENV['RAILS_SECRET_KEY']
end
