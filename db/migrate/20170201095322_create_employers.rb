class CreateEmployers < ActiveRecord::Migration[5.0]
  def change
    create_table :employers do |t|
      t.string :company_name
      t.string :location
      t.text :bio
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
