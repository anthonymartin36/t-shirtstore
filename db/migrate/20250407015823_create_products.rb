class CreateProducts < ActiveRecord::Migration[8.0]
  def change
    create_table :products do |t|
      t.string :SKU
      t.text :description
      t.text :material
      t.decimal :price
      t.integer :stock
      t.integer :image_id
      t.string :size
      t.string :colour
      t.timestamps
    end
  end
end
