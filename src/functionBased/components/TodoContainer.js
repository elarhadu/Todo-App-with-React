import React, { useState } from "react";
import Header from "./Header";
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import { v4 as uuidv4 } from "uuid";
import Navbar from './Navbar';
import { Route, Routes } from "react-router-dom"
import About from "../pages/About"
import NotMatch from "../pages/NotMatch"

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);

  const handleChange = (id) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const delTodo = (id) => {
    setTodos([
      ...todos.filter((todo) => {
        return todo.id !== id;
      }),
    ]);
  };

  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      })
    );
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={(
            <div className="container">
              <div className="inner">
                <Header />
                <InputTodo addTodoProps={addTodoItem} />
                <TodosList
                  todos={todos}
                  handleChange={handleChange}
                  delTodo={delTodo}
                  setUpdate={setUpdate}
                />
              </div>
            </div>
          )}
        />
        <Route path="/about/*" element={<About />} />
        <Route path="*" element={<NotMatch />} />
      </Routes>
    </>
  );
};

export default TodoContainer;
