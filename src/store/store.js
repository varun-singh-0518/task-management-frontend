import {configureStore, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
};

export const getAllTodos = createAsyncThunk("todo/getAllTodos", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/api/todos`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const addTodo = createAsyncThunk("todo/addTodo", async (todoData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_HOST}/api/todos/add`,
    todoData
  );
  return response.data;
});

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (index, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const todoId = state.todo.todos[index]._id;

      await axios.delete(`${process.env.REACT_APP_HOST}/api/todos/${todoId}`);
      return index;
    } catch (error) {
      console.error(error);
    }
  }
);

export const editTodo = createAsyncThunk(
  "todo/editTodo",
  async ({index, newTodo}, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const todoId = state.todo.todos[index]._id;

      const response = await axios.put(
        `${process.env.REACT_APP_HOST}/api/todos/${todoId}`,
        {
          newTodo,
        }
      );
      return {index, updatedTodo: response.data};
    } catch (error) {
      console.error(error);
    }
  }
);

export const toggleTodo = createAsyncThunk(
  "todo/toggleTodo",
  async (index, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const todoId = state.todo.todos[index]._id;

      const response = await axios.put(
        `${process.env.REACT_APP_HOST}/api/todos/${todoId}/toggle`
      );
      return {index, updatedTodo: response.data};
    } catch (error) {
      console.error(error);
    }
  }
);

// Create a slice using createSlice
const todoSlice = createSlice({
  name: "todo",
  initialState,
  extraReducers: {
    [getAllTodos.fulfilled]: (state, action) => {
      state.todos = action.payload;
    },
    [addTodo.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
    },
    [deleteTodo.fulfilled]: (state, action) => {
      state.todos = state.todos.filter(
        (todo, index) => index !== action.payload
      );
    },
    [editTodo.fulfilled]: (state, action) => {
      const {index, updatedTodo} = action.payload;
      state.todos[index] = updatedTodo;
    },
    [toggleTodo.fulfilled]: (state, action) => {
      const {index, updatedTodo} = action.payload;
      state.todos[index] = updatedTodo;
    },
  },
});

// Create the Redux store using configureStore
export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});
