class GuestMerger
  def self.call(guest_token:, customer:)
    return if guest_token.blank?

    guest = User.find_by(guest_token: guest_token)
    return unless guest

    customer_user = customer.user
    return if guest == customer_user

    ActiveRecord::Base.transaction do
      # Merge cart items
      Cart.where(user_id: guest.id).each do |guest_cart|
        existing = Cart.find_by(user_id: customer_user.id, product_id: guest_cart.product_id)
        if existing
          existing.increment!(:quantity, guest_cart.quantity)
          guest_cart.destroy!
        else
          guest_cart.update!(user_id: customer_user.id)
        end
      end

      # Merge wishlist items
      Wishlist.where(user_id: guest.id).each do |guest_wishlist|
        if Wishlist.exists?(user_id: customer_user.id, product_id: guest_wishlist.product_id)
          guest_wishlist.destroy!
        else
          guest_wishlist.update!(user_id: customer_user.id)
        end
      end

      guest.destroy!
    end
  end
end
