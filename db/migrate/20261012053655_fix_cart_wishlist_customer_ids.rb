class FixCartWishlistCustomerIds < ActiveRecord::Migration[8.0]
  def change
    # Carts — replace string customer_id with integer FK + guest_token
    remove_column :carts, :customer_id
    add_column    :carts, :customer_id, :integer
    add_column    :carts, :guest_token, :string
    add_index     :carts, :customer_id
    add_index     :carts, :guest_token
    add_foreign_key :carts, :customers, column: :customer_id

    # Wishlists — same treatment
    remove_column :wishlists, :customer_id
    add_column    :wishlists, :customer_id, :integer
    add_column    :wishlists, :guest_token, :string
    add_index     :wishlists, :customer_id
    add_index     :wishlists, :guest_token
    add_foreign_key :wishlists, :customers, column: :customer_id
  end
end
