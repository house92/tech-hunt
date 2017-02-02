class CreateApplications < ActiveRecord::Migration[5.0]
  def change
    create_table :applications do |t|
      t.text :body
      t.boolean :read, default: false
      t.boolean :accepted, default: false
      t.references :hunter, foreign_key: true
      t.references :job, foreign_key: true

      t.timestamps
    end
  end
end
