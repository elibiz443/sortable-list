titles = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6"]
descriptions = ["This is Task 1", "This is Task 2", "This is Task 3", "This is Task 4", "This is Task 5", "This is Task 6"]

titles.each_with_index do |title, index|
  Todo.create(title: title, description: descriptions[index])
end

