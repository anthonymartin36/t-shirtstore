class RefactorCartsAndWishlists < ActiveRecord::Migration[8.0]
  def change
    # Carts — drop customer_id/guest_token, add user_id
    remove_column :carts, :customer_id
    remove_column :carts, :guest_token
    add_column    :carts, :user_id, :integer
    add_index     :carts, :user_id
    add_foreign_key :carts, :users, column: :user_id

    # Wishlists — same
    remove_column :wishlists, :customer_id
    remove_column :wishlists, :guest_token
    add_column    :wishlists, :user_id, :integer
    add_index     :wishlists, :user_id
    add_foreign_key :wishlists, :users, column: :user_id

    # Now add FKs back to users (carts/wishlists exist now)
    add_foreign_key :users, :carts,     column: :cart_id
    add_foreign_key :users, :wishlists, column: :wishlist_id
  end
end
