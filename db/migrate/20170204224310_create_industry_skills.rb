class CreateIndustrySkills < ActiveRecord::Migration[5.0]
  def change
    create_table :industry_skills do |t|
      t.references :industry, foreign_key: true
      t.references :skill, foreign_key: true

      t.timestamps
    end
  end
end
