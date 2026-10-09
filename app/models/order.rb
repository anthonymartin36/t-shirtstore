class Order < ApplicationRecord
  belongs_to :customer
  belongs_to :payment
  belongs_to :shipment
  has_many :order_items
end
