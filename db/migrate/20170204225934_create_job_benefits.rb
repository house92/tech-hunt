class CreateJobBenefits < ActiveRecord::Migration[5.0]
  def change
    create_table :job_benefits do |t|
      t.integer :value
      t.references :job, foreign_key: true
      t.references :benefit, foreign_key: true

      t.timestamps
    end
  end
end
