class AddDeviseToCustomers < ActiveRecord::Migration[8.0]
  def change
    rename_column :customers, :password_digest, :encrypted_password

    add_column :customers, :reset_password_token,   :string
    add_column :customers, :reset_password_sent_at, :datetime
    add_column :customers, :remember_created_at,    :datetime

    add_index :customers, :email,                unique: true
    add_index :customers, :reset_password_token, unique: true
  end
end
