class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.string :nickname, null: false
      t.index :nickname, unique: true
      t.timestamps
    end
  end
end
