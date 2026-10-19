class User < ApplicationRecord
  has_one  :customer
  belongs_to :cart,     optional: true
  belongs_to :wishlist, optional: true
end
