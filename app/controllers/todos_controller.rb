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
      flash[:notice] = "List Created!"
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
    flash[:success] =  'List Updated Successfully!'
    redirect_to '/'
  end

  def destroy
    @todo.destroy
    flash[:success] =  'List Deleted!'
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
    params.require(:todo).permit(:title, :description, :position, :minimized, :visibility)
  end
end
