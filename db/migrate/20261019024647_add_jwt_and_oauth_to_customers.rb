class AddJwtAndOauthToCustomers < ActiveRecord::Migration[8.0]
  def change
    add_column :customers, :jti, :string
    add_column :customers, :provider, :string
    add_column :customers, :uid, :string
    add_index  :customers, :jti, unique: true
    add_index  :customers, [:provider, :uid], unique: true

    # backfill existing rows if any
    reversible do |dir|
      dir.up do
        Customer.reset_column_information
        Customer.find_each { |c| c.update_column(:jti, SecureRandom.uuid) }
      end
    end
    change_column_null :customers, :jti, false
  end
end