class CreateOrders < ActiveRecord::Migration[8.0]
  def change
    create_table :orders do |t|
      t.references :customer, null: false, foreign_key: true
      t.references :shipment, null: false, foreign_key: true
      t.references :payment, null: false, foreign_key: true
      t.decimal :cost_price,    precision: 10, scale: 2
      t.decimal :tax,           precision: 10, scale: 2
      t.decimal :courier_cost,  precision: 10, scale: 2
      t.decimal :total,         precision: 10, scale: 2

      t.timestamps
    end

    add_foreign_key :order_items, :orders, column: :order_id
  end
end
