import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../interfaces/todo";

export interface TodoState {
  todoItems: Todo[];
  todoSelected: number | null;
}

export const initialState: TodoState = {
  todoItems: [],
  todoSelected: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todoItems = [...action.payload];
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todoItems = [action.payload, ...state.todoItems];
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      const item: Todo = state.todoItems.filter(
        (x) => x.id === action.payload
      )[0];
      if (item != null && item != undefined) {
        const index: number = state.todoItems.indexOf(item);
        if (index > -1) {
          state.todoItems = state.todoItems.filter(
            (x) => x !== state.todoItems[index]
          );
        }
      }
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const item: Todo = state.todoItems.filter(
        (x) => x.id === action.payload.id
      )[0];
      if (item != null && item != undefined) {
        const index: number = state.todoItems.indexOf(item);
        if (index > -1) {
          state.todoItems[index] = action.payload;
        }
      }
    },
    markAsReady: (state, action: PayloadAction<number>) => {
      const item: Todo = state.todoItems.filter(
        (x) => x.id === action.payload
      )[0];
      if (item != null && item != undefined) {
        const index: number = state.todoItems.indexOf(item);
        if (index > -1) {
          item.completed = !item.completed;
          state.todoItems[index] = item;
        }
      }
    },
    setTodoSelected: (state, action: PayloadAction<number>) => {
      state.todoSelected = action.payload;
    },
    removeTodoSelected: (state, action: PayloadAction<void>) => {
      /* Lo quita del formulario de edición */
      state.todoSelected = null;
    },
  },
});

export const {
  addTodos,
  addTodo,
  removeTodo,
  updateTodo,
  removeTodoSelected,
  setTodoSelected,
  markAsReady,
} = todoSlice.actions;
export default todoSlice.reducer;
