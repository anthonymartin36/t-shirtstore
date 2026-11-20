class AllowlistedJwt < ApplicationRecord
  belongs_to :customer

  before_create :capture_request_context

  private

  def capture_request_context
    ua = Current.user_agent.to_s
    self.remote_ip    = Current.request_ip
    self.browser_data = extract_browser(ua)
    self.os_data      = extract_os(ua)
    self.device_data  = ua.match?(/Mobile|Android|iPhone|iPad/i) ? 'mobile' : 'desktop'
  end

  def extract_browser(ua)
    case ua
    when /Edg/i     then 'Edge'
    when /Chrome/i  then 'Chrome'
    when /Firefox/i then 'Firefox'
    when /Safari/i  then 'Safari'
    else 'unknown'
    end
  end

  def extract_os(ua)
    case ua
    when /Android/i     then 'Android'
    when /iPhone|iPad/i then 'iOS'
    when /Windows/i     then 'Windows'
    when /Mac OS/i      then 'macOS'
    when /Linux/i       then 'Linux'
    else 'unknown'
    end
  end
end
