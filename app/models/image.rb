class Image < ApplicationRecord
  has_many :products # An image can belong to multiple products
end
