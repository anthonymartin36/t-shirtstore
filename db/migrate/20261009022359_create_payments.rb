class CreatePayments < ActiveRecord::Migration[8.0]
  def change
    create_table :payments do |t|
      t.string :card_name
      t.string :card_number
      t.string :expiry_date
      t.string :cvv
      t.references :customer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
