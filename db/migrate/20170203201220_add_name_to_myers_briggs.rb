class AddNameToMyersBriggs < ActiveRecord::Migration[5.0]
  def change
    add_column :myers_briggs, :name, :string, default: "Myers-Briggs"
  end
end
