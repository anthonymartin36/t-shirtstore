class CreateCustomers < ActiveRecord::Migration[8.0]
  def change
    create_table :customers do |t|
      t.string :first_name
      t.string :second_name
      t.string :email
      t.string :password_digest
      t.string :address
      t.string :phone_number

      t.timestamps
    end
  end
end
