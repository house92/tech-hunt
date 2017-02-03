class CreateMyersBriggs < ActiveRecord::Migration[5.0]
  def change
    create_table :myers_briggs do |t|
      t.string :first
      t.string :second
      t.string :third
      t.string :fourth
      t.references :hunter, foreign_key: true

      t.timestamps
    end
  end
end
