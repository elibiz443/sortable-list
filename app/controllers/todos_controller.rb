class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :edit, :update, :destroy]

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

  private

  def set_todo
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:description, :position)
  end
end
