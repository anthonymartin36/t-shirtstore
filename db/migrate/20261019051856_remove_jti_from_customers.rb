class RemoveJtiFromCustomers < ActiveRecord::Migration[8.0]
  def change
    remove_index :customers, :jti
    remove_column :customers, :jti, :string
  end
end
