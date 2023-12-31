# SORTABLE-LIST

This is a simple application that implements sortable drag and drop functionality and persists the changes, using stimulus in Rails. 

Run on your machine(Run the following):
```
git@github.com:elibiz443/sortable-list.git && cd sortable-list && bundle && rails db:create db:migrate db:seed && bin/dev
```

Then on your browser, go to:
```
http://localhost:3000
```

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

Edit Todo model as follows:
```
class Todo < ApplicationRecord
  acts_as_list
  validates :description, presence: true
end
```

Create Todos controller:
```
rails g controller todos index
```

Edit Route file as follows:
```
Rails.application.routes.draw do
  resources :todos do
    member do
      patch :move
    end
  end

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

Add SortableJS:
```
npm install sortablejs --save
```

Add drag_controller stimulus:
```
rails generate stimulus drag 
```

Edit drag_controller stimulus as follows:
```
import { Controller } from "@hotwired/stimulus"
import Sortable from 'sortablejs'

export default class extends Controller {
  connect() {
    this.sortable = Sortable.create(this.element, {
      onEnd: this.end.bind(this)
    })
  }

  end(event) {
    const id = event.item.dataset.id;
    const data = new FormData();
    data.append("position", event.newIndex + 1);

    fetch(this.data.get("url").replace(":id", id), {
      method: 'PATCH',
      headers: {
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    });
  }
}
```

Update the views as follows(I am using Tailwind CSS):
```
<!-- todos/index.html.erb -->

<div class="p-4 bg-gray-500/[.4] w-[90%] mx-auto h-screen my-5 rounded-3xl">
  <div class="my-2 flex py-2 px-4">
    <div class="w-1/2">
      <h1 class="text-lg md:text-3xl font-bold text-slate-800 hover:opacity-75 cursor-pointer">Todo List</h1>
    </div>
    <div class="w-1/2 text-right">
      <%= link_to new_todo_path, class: 'px-4 py-2 border-2 border-gray-800 text-gray-800 text-md rounded-md hover:opacity-75' do %>
        Add New Todo
      <% end %>
    </div>
  </div>
  <div class="py-3 px-10 bg-gray-400/[.9] rounded-lg h-[70%] overflow-y-auto scroll-my-0.5">
    <div data-controller="drag" data-drag-url="/todos/:id/move" class="mt-2 space-y-4">
      <% @todos.order(position: :asc).each do |todo| %>
        <div class="bg-gray-600/[.9] text-gray-200 hover:opacity-75 text-center cursor-grab rounded-md w-[40%] mx-auto py-3 shadow-md shadow-slate-500 hover:shadow-none" data-id="<%= todo.id %>">
          <%= todo.description %>
        </div>
      <% end %>
    </div>
    <div class="absolute bottom-0 left-2/3 transform -translate-x-1/3 animate-bounce">
      <i class="fas fa-arrow-down text-gray-100 text-3xl bg-gray-600/[.9] rounded-full w-[2.5rem] h-[2.5rem] text-center py-1"></i>
    </div>
  </div>
</div>
```

Add inline_svg gem(for images):
```
gem 'inline_svg'
```

```
<!-- layouts/application.html.erb -->

<!DOCTYPE html>
<html>
  <head>
    <title>SortableList</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <%= javascript_include_tag "application", "data-turbo-track": "reload", defer: true %>

    <!-- Font Awesome 6 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Font -->
    <link href="https://fonts.cdnfonts.com/css/ubuntu" rel="stylesheet">

    <!-- FAV AND ICONS   -->
    <%= favicon_link_tag "favicon.png" %>
  </head>

  <body class="bg-gray-400 max-w-full overflow-x-hidden font-['ubuntu']">
    <%= render "shared/header" %>
    <main class="min-h-screen">
      <%= yield %>
    </main>
    <%= render "shared/footer" %>
  </body>
</html>
```

Create controller:
```
rails g controller todos index
```

Edit controller as follows:
```
class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :edit, :update, :destroy, :move]

  def index
    @todos = Todo.all
  end

  def show; end

  def new
    @todo = Todo.new
  end

  def edit; end

  def create
    @todo = Todo.new(todo_params)
    
    if @todo.save
      flash[:notice] = "Todo Created!"
      redirect_to '/'
    else
      if (@todo.errors.full_messages).uniq! == nil
        error = @todo.errors.full_messages
      else
        error = (@todo.errors.full_messages).uniq!
      end
      flash[:alert] = error.join(', ')
      redirect_to '/'
    end
  end

  def update
    @todo.update(todo_params)
    flash[:success] =  'Todo Updated Successfully!'
    redirect_to '/'
  end

  def destroy
    @todo.destroy
    flash[:success] =  'Todo Deleted!'
    redirect_to '/'
  end

  def move
    @todo.insert_at(params[:position].to_i)
    head :ok
  end

  private

  def set_todo
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:description, :position)
  end
end
```

###### Happy Coding 🙌
