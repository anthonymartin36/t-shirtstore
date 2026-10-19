class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string  :guest_token, null: false
      t.integer :cart_id
      t.integer :wishlist_id
      t.timestamps
    end
    add_index :users, :guest_token, unique: true
  end
end
