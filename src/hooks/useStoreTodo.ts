import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../redux";
import axios, { AxiosError, AxiosResponse } from "axios";
import { CreateTodo } from "../interfaces/createTodo";
import { Todo } from "../interfaces/todo";
import { ServerErrorResponse } from "../interfaces/ServerErrorResponse";
import { useState } from "react";
import { addTodo, updateTodo } from "../redux/slices/todo";

export const useStoreTodo = () => {
  const dispatcher = useAppDispatch();
  const { todo } = useAppSelector((state) => state);
  const [todoAdd, settodoAdd] = useState<CreateTodo | null>(null);

  const { isLoading, error, data, isFetching, refetch, isRefetching,isSuccess } =
    useQuery<Todo, AxiosError<ServerErrorResponse>>(
      ["addTodo", todoAdd],
      async (): Promise<Todo> => {
        //Quiere Editar
        if (todo.todoSelected != null) {
          const res = await axios.put(`http://localhost:3000/todo/${todo.todoSelected}`, {...todoAdd,id:todo.todoSelected});
          if (res.status == 200) {
            const nuevoTodo = res.data;
            dispatcher(updateTodo(nuevoTodo));
          }
          return res.data || null;
        } else {
          //Quiere agregar
          const res = await axios.post(`http://localhost:3000/todo`, todoAdd);
          if (res.status == 201) {
            const nuevoTodo = res.data;
            dispatcher(addTodo(nuevoTodo));
          }
          return res.data || null;
        }
      },
      {
        enabled: false,
      }
    );
  return {
    isLoading,
    error,
    data,
    isFetching,
    isRefetching,
    isSuccess,
    todoAdd,
    settodoAdd,
    refetch,
  };
};
