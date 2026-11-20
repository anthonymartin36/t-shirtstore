class CreatePasswordResetRequests < ActiveRecord::Migration[8.0]
  def change
    create_table :password_reset_requests do |t|
      t.references :customer, null: false, foreign_key: { on_delete: :cascade }
      t.datetime :requested_at, null: false
      t.datetime :completed_at
      t.string :ip_address
      t.timestamps
    end
  end
end
