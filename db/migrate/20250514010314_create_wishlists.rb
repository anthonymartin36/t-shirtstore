class CreateWishlists < ActiveRecord::Migration[8.0]
  def change
    create_table :wishlists do |t|
      t.integer :quantity
      t.string :customer_id
      t.references :product, null: false, foreign_key: true

      t.timestamps
    end
  end
end
