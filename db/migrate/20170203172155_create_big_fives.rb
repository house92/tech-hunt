class CreateBigFives < ActiveRecord::Migration[5.0]
  def change
    create_table :big_fives do |t|
      t.integer :extraversion
      t.integer :conscientiousness
      t.integer :agreeableness
      t.integer :stability
      t.integer :openness
      t.references :hunter, foreign_key: true

      t.timestamps
    end
  end
end
