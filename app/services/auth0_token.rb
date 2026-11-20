class Auth0Token
  class Invalid < StandardError; end

  def self.verify!(token)
    domain   = ENV.fetch('AUTH0_DOMAIN').sub(%r{^https?://}, '')
    jwks_uri = "https://#{domain}/.well-known/jwks.json"
    jwks_response = Net::HTTP.get(URI(jwks_uri))
    jwks = JWT::JWK::Set.new(JSON.parse(jwks_response))

    payload, _ = JWT.decode(
      token, nil, true,
      algorithms: ['RS256'],
      jwks: jwks,
      aud: ENV.fetch('AUTH0_CLIENT_ID'),
      verify_aud: true
    )
    payload
  rescue JWT::DecodeError => e
    raise Invalid, e.message
  end
end
