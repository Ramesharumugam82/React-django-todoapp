import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoApp = () => {
  const [todos, setTodos] = useState([]); // State to hold to-do list
  const [title, setTitle] = useState(""); // State for new to-do title
  const [description, setDescription] = useState(""); // State for new to-do description
  const [completed, setCompleted] = useState(false); // State for new to-do completion status
  const [editingTodo, setEditingTodo] = useState(null); // State for the todo being edited

  // Fetch To-Do items from Django API
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todos/");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Add a new To-Do item
  const addTodo = async () => {
    try {
      const newTodo = { title, description, completed };
      await axios.post("http://127.0.0.1:8000/api/todos/", newTodo);
      fetchTodos(); // Refresh the list
      resetForm();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  // Update an existing To-Do item
  const updateTodo = async () => {
    try {
      const updatedTodo = { title, description, completed };
      await axios.put(`http://127.0.0.1:8000/api/todos/${editingTodo.id}/`, updatedTodo);
      fetchTodos(); // Refresh the list
      resetForm();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Delete a To-Do item
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`);
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCompleted(false);
    setEditingTodo(null);
  };

  // Set the form fields for editing
  const editTodo = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setCompleted(todo.completed);
    setEditingTodo(todo);
  };

  useEffect(() => {
    fetchTodos(); // Fetch data on component mount
  }, []);

  return (
    <div>
      <h1>To-Do App</h1>

      <div className="inputContainer">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            style={{'borderRadius':"50%"}}
          />
          Completed
        </label>
        {editingTodo ? (
          <button onClick={updateTodo}  style={{'backgroundColor':'green',}}>Update To List</button>
        ) : (
          <button onClick={addTodo}>Add to List</button>
        )}
      </div>

      {/* Display the List of To-Do Items */}
      <div className="toDoList">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <b><p>Title: {todo.title}</p></b>
              <b><p>Description: {todo.description}</p></b>
              <b><p>Task Stats: {todo.completed ? "Completed" : "In progress"}</p></b>
              <button onClick={() => editTodo(todo)} style={{'backgroundColor':'green',}}>Update</button>
              <button onClick={() => deleteTodo(todo.id)} style={{'backgroundColor':'red',}}>DELETE</button>
            </li>
          ))}
      </ul>
    </div>
    </div >
  );
};

export default TodoApp;