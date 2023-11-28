class Todo < ApplicationRecord
  acts_as_list
  validates :title, presence: true
  validates :description, presence: true

  default_scope { order(position: :asc) }
end
