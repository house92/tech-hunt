class CreateHunterSkills < ActiveRecord::Migration[5.0]
  def change
    create_table :hunter_skills do |t|
      t.string :competence
      t.references :hunter, foreign_key: true
      t.references :skill, foreign_key: true

      t.timestamps
    end
  end
end
