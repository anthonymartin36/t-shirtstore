class CreateImages < ActiveRecord::Migration[8.0]
  def change
    create_table :images do |t|
      t.string :image_name
      t.string :image_alt
      t.string :image_url

      t.timestamps
    end
  end
end
