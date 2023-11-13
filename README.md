# SORTABLE-LIST

This is a simple application that implements sortable drag and drop functionality using stimulus in Rails.

#### Tools Used:

- [x] Hotwire(Stimulus & Turbo)
- [x] Tailwind CSS
- [x] SortableJS
- [x] PostgreSQL
- [x] Esbuild
- [x] Rails
- [x] RSpec
- [x] Ruby

Turbo speeds up Rails applications, reduces the amount of JavaScript we have to write, and makes it easy to work with real-time features. The best part of it is that it's simple to learn.

## Getting Started:

```
rails new sortable-list -j esbuild -c tailwind -d postgresql -T && cd sortable-list && subl .
```

## Add RSpec:

- In Gemfile, add:
```
group :development, :test do
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
  gem "rspec-rails"
  gem "factory_bot_rails", :require => false
  gem "faker"
  gem "database_cleaner-active_record"
end
```

- In Terminal, Run: 
```
bundle && rails g rspec:install && mkdir spec/support && touch spec/support/factory_bot.rb && touch spec/factories.rb
```

- Configure FactoryBot by adding:
```
# spec/support/factory_bot.rb

require 'factory_bot'

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
  FactoryBot.find_definitions
end
```

- Require support files in rails_helper.rb:
```
require_relative 'support/factory_bot'
```

- In rails_helper.rb, uncomment:
```
Dir[Rails.root.join('spec', 'support', '**', '*.rb')].sort.each { |f| require f }
```

- When User model is generated (or any model) RSpec will generate a factory in factories.rb file. Modify it to look like:

```
# spec/factories.rb

FactoryBot.define do
end
```

- Run Tests with: ```rspec```

We will run:

* For Server, etc
```
bin/dev
```

Install Simple Form:
```
gem "simple_form", "~> 5.1.0"
```
```
bundle && bin/rails generate simple_form:install
```
The role of the simple_form gem is to make forms easy to work with. It also helps keep the form designs consistent across the application by making sure we always use the same CSS classes.

Generate Todo Model:
```
rails g model Todo description position:integer
```

Add, acts_as_list gem:
```
bundle add acts_as_list
```

Edid Todo model as follows:
```
class Todo < ApplicationRecord
  acts_as_list
  validates :description, presence: true

  default_scope {order('todos.created_at ASC')}
end
```

Create Todos controller:
```
rails g controller todos index
```

Edit Route file as follows:
```
Rails.application.routes.draw do
  resources :todos

  root "todos#index"
end
```

Edit Seed file as follows:
```
descriptions = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6"]

descriptions.each do |description|
  Todo.create(description: description)
end
```

Stop Server(CTRL + C), create, migrate & seed DB and rerun the server:
```
rails db:create db:migrate db:seed && bin/dev
```

In browser, go to:
```
http://localhost:3000
```

###### Happy Coding 🙌
