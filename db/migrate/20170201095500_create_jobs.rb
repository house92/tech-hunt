class CreateJobs < ActiveRecord::Migration[5.0]
  def change
    create_table :jobs do |t|
      t.string :title
      t.string :location
      t.integer :salary
      t.string :grading
      t.string :description
      t.boolean :full_time
      t.boolean :contract
      t.boolean :offers_visa
      t.references :employer, foreign_key: true

      t.timestamps
    end
  end
end
