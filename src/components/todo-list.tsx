import { Todo } from "../interfaces/todo";
import { useFetchTodos } from "../hooks/useFetchTodos";
import { useAppSelector } from "../redux";
import { TodoViewModal } from "./todo-view-modal";
import { useState } from "react";
import { TodoBox } from "./todo-box";
export const TodoList = () => {
  const { todo } = useAppSelector((state) => state);
  const [todoViewSelected, settodoViewSelected] = useState<Todo | null>(null);
  const { isFetching, deleteTodo, markTodoAsReady } = useFetchTodos();

  return (
    <div>
      {todo.todoItems != null && !isFetching && todo.todoItems.length > 0 ? (
        <div
          className="flex flex-col overflow-y-auto hide-scrollbar rounded bg-white max-h-[560px] 
        mt-5 md:mt-0 md:min-h-[560px]  min-h-[438px]"
        >
          {todo.todoItems.map((t: Todo) => {
            return (
              <TodoBox
                key={t.id}
                todo={t}
                deleteTodo={deleteTodo}
                settodoViewSelected={settodoViewSelected}
                markTodoAsReady={markTodoAsReady}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center h-full bg-white rounded flex justify-center items-center  py-[5rem]">
          <span className="text-2xl">Sin tareas pendientes..</span>
        </div>
      )}

      {todoViewSelected && (
        <TodoViewModal
          todo={todoViewSelected}
          settodoViewSelected={settodoViewSelected}
        />
      )}
    </div>
  );
};
