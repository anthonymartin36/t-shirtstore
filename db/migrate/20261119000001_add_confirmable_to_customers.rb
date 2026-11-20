class AddConfirmableToCustomers < ActiveRecord::Migration[8.0]
  def change
    add_column :customers, :confirmation_token, :string
    add_column :customers, :confirmed_at, :datetime
    add_column :customers, :confirmation_sent_at, :datetime
    add_column :customers, :unconfirmed_email, :string
    add_index :customers, :confirmation_token, unique: true

    # Confirm all existing customers so they are not locked out
    reversible do |dir|
      dir.up { Customer.update_all(confirmed_at: Time.current) }
    end
  end
end
