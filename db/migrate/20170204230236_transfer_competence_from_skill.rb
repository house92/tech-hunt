class TransferCompetenceFromSkill < ActiveRecord::Migration[5.0]
  def change
    remove_column :skills, :competence, :string
    add_column :job_skills, :competence, :string
  end
end
