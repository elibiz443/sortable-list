class Todo < ApplicationRecord
  acts_as_list
  validates :description, presence: true
end
