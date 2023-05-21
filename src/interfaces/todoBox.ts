import { UseMutationResult } from "@tanstack/react-query";
import { Todo } from "./todo";
import { ServerErrorResponse } from "./ServerErrorResponse";

export interface TodoBoxType {
  todo: Todo;
  deleteTodo: UseMutationResult<
    ServerErrorResponse | undefined,
    unknown,
    number,
    unknown
  >;
  markTodoAsReady: UseMutationResult<
    ServerErrorResponse | undefined,
    unknown,
    number,
    unknown
  >;
  settodoViewSelected: React.Dispatch<React.SetStateAction<Todo | null>>;
}
