class CreateTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.string :title
      t.text :description
      t.integer :position
      t.boolean :minimized, default: false
      t.boolean :visibility, default: true

      t.timestamps
    end
  end
end
