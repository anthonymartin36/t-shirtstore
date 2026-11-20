class RefactorCustomers < ActiveRecord::Migration[8.0]
  def change
    add_column :customers, :name,    :string
    add_column :customers, :user_id, :integer
    add_index  :customers, :user_id, unique: true
    add_foreign_key :customers, :users, column: :user_id

    remove_column :customers, :first_name
    remove_column :customers, :second_name
  end
end
