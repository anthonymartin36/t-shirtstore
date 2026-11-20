class GoogleIdToken
  class Invalid < StandardError; end

  def self.verify!(id_token)
    payload = Google::Auth::IDTokens.verify_oidc(id_token, aud: ENV.fetch("GOOGLE_CLIENT_ID"))
    raise Invalid, "email not verified" unless payload["email_verified"]
    payload
  rescue Google::Auth::IDTokens::VerificationError => e
    raise Invalid, e.message
  end
end
