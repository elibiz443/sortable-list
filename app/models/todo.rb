class Todo < ApplicationRecord
  acts_as_list
  validates :description, presence: true

  default_scope {order('todos.created_at ASC')}
end
