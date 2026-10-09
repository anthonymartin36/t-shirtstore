class CreateShipments < ActiveRecord::Migration[8.0]
  def change
    create_table :shipments do |t|
      t.string :full_name
      t.string :address
      t.string :city
      t.string :postal_code
      t.string :country
      t.references :customer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
