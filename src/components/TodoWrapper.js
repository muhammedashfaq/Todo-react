import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import "../App.css";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const addTodo = (todo) => {
    if (todo.trim() !== "") {
      const duplicat = todos.some((exist) => exist.task.toLowerCase() === todo.toLowerCase());
      if (duplicat) {
        setErrorMessage("Not accept duplicate Todo");
      } else {
        setTodos([
          ...todos,
          { id: uuidv4(), task: todo, completed: false, isEditing: false },
        ]);
        setErrorMessage("");
      }
    } else {
      setErrorMessage("Please enter a valid todo");
    }
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Todo List.. !</h1>

      <TodoForm addTodo={addTodo} />

      {errorMessage && <p className="error">{errorMessage}</p>}

      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            toggleCompleted={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};
