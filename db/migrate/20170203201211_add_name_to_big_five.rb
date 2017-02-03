class AddNameToBigFive < ActiveRecord::Migration[5.0]
  def change
    add_column :big_fives, :name, :string, default: "Big Five"
  end
end
