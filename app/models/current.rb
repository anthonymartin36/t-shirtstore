class Current < ActiveSupport::CurrentAttributes
  attribute :request_ip, :user_agent
end
