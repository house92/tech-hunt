class CreateSocialMedia < ActiveRecord::Migration[5.0]
  def change
    create_table :social_media do |t|
      t.references :user, foreign_key: true
      t.integer :sm_id
      t.string :email
      t.string :sm_acc_token
      t.integer :public_repos
      t.integer :public_gists
      t.integer :followers
      t.integer :following

      t.timestamps
    end
  end
end
