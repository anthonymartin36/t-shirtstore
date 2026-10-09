class CreateOrderItems < ActiveRecord::Migration[8.0]
  def change
    create_table :order_items do |t|
      t.integer :quantity
      t.decimal :price
      t.references :product, null: false, foreign_key: true
      t.integer :order_id, null: false
      t.index :order_id

      t.timestamps
    end
  end
end
