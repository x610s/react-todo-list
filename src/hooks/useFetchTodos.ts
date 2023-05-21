import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useAppDispatch } from "../redux";
import axios, { AxiosError, AxiosResponse } from "axios";
import { addTodos, markAsReady, removeTodo } from "../redux/slices/todo";
import { Todo } from "../interfaces/todo";
import { ServerErrorResponse } from "../interfaces/ServerErrorResponse";

export const useFetchTodos = () => {
  const dispatcher = useAppDispatch();

  const { isLoading, error, data, isFetching, refetch, isRefetching } =
    useQuery<void, AxiosError>(["getTodos"], async (): Promise<void> => {
      const res = await axios.get(`http://localhost:3000/todo`);
      if (res.status == 200) {
        dispatcher(addTodos(res.data));
      }
      return res.data;
    });

  const deleteTodo = useMutation(async (id: number) => {
    const res = await axios.delete<
      AxiosResponse<void>,
      AxiosError<ServerErrorResponse>
    >(`http://localhost:3000/todo/${id}`);
    if (res.status == 200) {
      dispatcher(removeTodo(id));
    }
    return res.response?.data;
  });

  const markTodoAsReady = useMutation(async (id: number) => {
    const res = await axios.put<
      AxiosResponse<Todo>,
      AxiosError<ServerErrorResponse>
    >(`http://localhost:3000/todo/markAsReady/${id}`);
    if (res.status == 200) {
      dispatcher(markAsReady(id));
    }
    return res.response?.data;
  });

  return {
    isLoading,
    error,
    isFetching,
    isRefetching,
    deleteTodo,
    markTodoAsReady,
    refetch,
  };
};
