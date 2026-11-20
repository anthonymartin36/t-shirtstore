class CustomDeviseMailer < Devise::Mailer
  def reset_password_instructions(record, token, opts = {})
    @token     = token
    @resource  = record
    @reset_url = "#{ENV.fetch('FRONTEND_URL', 'http://localhost:5173')}/reset-password?token=#{token}"
    mail(to: record.email, from: Devise.mailer_sender, subject: 'Reset your T-Shirt Store password')
  end

  def confirmation_instructions(record, token, opts = {})
    @token            = token
    @resource         = record
    @confirmation_url = "#{ENV.fetch('FRONTEND_URL', 'http://localhost:5173')}/confirm-email?token=#{token}"
    mail(to: record.email, from: Devise.mailer_sender, subject: 'Confirm your T-Shirt Store email')
  end
end
