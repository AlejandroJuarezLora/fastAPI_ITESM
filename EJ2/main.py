from pydantic import BaseModel
from typing import Optional
from fastapi import FastAPI

class Todo(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    completed: bool = False


app = FastAPI()

todos = []


@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI CRUD!"}



@app.post("/todos/")
def create_todo(todo: Todo):
    todos.append(todo)
    return todo

@app.get("/todos/")
def get_todos():
    return todos

# @app.get("/todos/{todo_id}")
# def get_todo(todo_id: int):
#     for todo in todos:
#         if todo.id == todo_id:
#             return todo
#     return {"error": "To-do item not found!"}


@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, updated_todo: Todo):
    for index, todo in enumerate(todos):
        if todo.id == todo_id:
            todos[index] = updated_todo
            return updated_todo
    return {"error": "To-do item not found!"}


@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    for index, todo in enumerate(todos):
        if todo.id == todo_id:
            todos.pop(index)
            return {"message": "To-do item deleted!"}
    return {"error": "To-do item not found!"}