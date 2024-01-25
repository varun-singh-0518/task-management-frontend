import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleTodo, deleteTodo, editTodo, getAllTodos} from "../store/store";

function ToDoList() {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [editIndex, setEditIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  const handleToggle = (index) => {
    dispatch(toggleTodo(index));
  };

  const handleDelete = (index) => {
    dispatch(deleteTodo(index));
  };

  const handleEditStart = (index) => {
    setEditIndex(index);
    setEditedTodo((prevEditedTodo) => ({
      ...prevEditedTodo,
      title: todos[index].title,
      description: todos[index].description,
      dueDate: todos[index].dueDate
        ? new Date(todos[index].dueDate).toISOString().split("T")[0]
        : "",
    }));
  };

  const handleEditCancel = () => {
    setEditIndex(null);
  };

  const handleEditSave = (index) => {
    dispatch(
      editTodo({
        index,
        newTodo: {
          title: editedTodo.title,
          description: editedTodo.description,
          dueDate: editedTodo.dueDate,
        },
      })
    );
    setEditIndex(null);
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setEditedTodo({
      ...editedTodo,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <ul className="list-none">
        {todos?.map((todo, index) => (
          <li
            key={index}
            className="flex flex-col items-start justify-between mb-4 md:flex-row md:items-center md:mb-2 md:space-x-4"
          >
            {editIndex === index ? (
              <div className="w-full md:flex-grow">
                <input
                  type="text"
                  name="title"
                  value={editedTodo.title}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1 mb-2 w-full"
                />
                <input
                  type="text"
                  name="description"
                  value={editedTodo.description}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1 mb-2 w-full"
                />
                <input
                  type="date"
                  name="dueDate"
                  value={editedTodo.dueDate}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1 mb-2 w-full"
                />
                <div className="flex space-x-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex-grow"
                    onClick={() => handleEditSave(index)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex-grow"
                    onClick={handleEditCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Render todo details and buttons for toggling, deleting, and editing
              <>
                <div className="w-full md:flex-grow">
                  <span
                    className={`text-gray-800 ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                  <p className="text-sm text-gray-500">
                    {todo.description && `Description: ${todo.description}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {todo.dueDate && `Due Date: ${todo.dueDate}`}
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                  <span
                    className={`${
                      todo.completed ? "text-green-500" : "text-red-500"
                    } font-bold`}
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </span>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleToggle(index)}
                  >
                    Toggle
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditStart(index)}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
