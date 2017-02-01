class CreateHunters < ActiveRecord::Migration[5.0]
  def change
    create_table :hunters do |t|
      t.string :first_name
      t.string :last_name
      t.string :location
      t.text :bio
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
