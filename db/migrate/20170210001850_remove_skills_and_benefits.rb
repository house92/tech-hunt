class RemoveSkillsAndBenefits < ActiveRecord::Migration[5.0]
  def change
    drop_table :hunter_skills
    drop_table :industry_skills
    drop_table :job_skills
    drop_table :job_benefits
    drop_table :skills
    drop_table :benefits
  end
end
