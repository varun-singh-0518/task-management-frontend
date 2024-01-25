import {useState} from "react";
import {useDispatch} from "react-redux";
import {addTodo} from "../store/store";

function ToDoForm() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addTodo({
        title: taskTitle,
        description: taskDescription,
        dueDate: dueDate,
      })
    );

    setTaskTitle("");
    setTaskDescription("");
    setDueDate("");
  };

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center md:flex-row md:items-start"
      >
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-300 p-2 mb-2 w-full md:w-1/2 md:mr-2"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="border border-gray-300 p-2 mb-2 w-full md:w-1/2 md:mr-2"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="Due Date"
          className="border border-gray-300 p-2 mb-2 w-full md:w-1/2 md:mr-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
          type="submit"
        >
          Create Todo
        </button>
      </form>
    </div>
  );
}

export default ToDoForm;
