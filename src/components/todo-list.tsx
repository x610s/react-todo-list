import { Todo } from "../interfaces/todo";
import { useFetchTodos } from "../hooks/useFetchTodos";
import { useAppDispatch, useAppSelector } from "../redux";
import { TodoViewModal } from "./todo-view-modal";
import { useState } from "react";
import { removeTodoSelected, setTodoSelected } from "../redux/slices/todo";
import { formatDate } from "../helpers/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCheck, faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { setSelectedTab } from "../redux/slices/tab";
export const TodoList = () => {
  const dispatcher = useAppDispatch();
  const { todo } = useAppSelector((state) => state);
  const [todoViewSelected, settodoViewSelected] = useState<Todo | null>(null);
  const { isFetching, deleteTodo, markTodoAsReady } = useFetchTodos();

  const handleRemove = (id: number) => {
    deleteTodo.mutate(id);
  };
  const handleMarkAsReady = (id: number) => {
    markTodoAsReady.mutate(id);
  };

  return (
    <div>
      {todo.todoItems != null && !isFetching && todo.todoItems.length > 0 ? (
        <div className="flex flex-col overflow-y-auto hide-scrollbar rounded bg-white max-h-[560px] 
        mt-5 md:mt-0 md:min-h-[560px]  min-h-[438px]">
          {todo.todoItems.map((t: Todo) => {
            return (
              <div
                key={t.id}
                className={`${
                  t.completed ? "bg-green-50" : "bg-white"
                }  p-4 border-b flex flex-row justify-between md:grid-cols-2 grid grid-cols-1`}
              >
                <div className="flex flex-col">
                  <span>{t.title}</span>
                  <small className="text-slate-400">{formatDate(t.date)}</small>
                </div>
                <div className="flex flex-row  sm:justify-center justify-center md:justify-end    md:mt-3  items-center">
                  {t.completed ? (
                    <div
                      className="border border-2 px-1.5 rounded  text-sky-400 cursor-pointer
                       hover:text-white hover:bg-sky-400 ease-in-out  duration-300"
                      title="Marcar como 'Completada'"
                      onClick={() => {
                        handleMarkAsReady(t.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                  ) : (
                    <div
                      className="border border-2 px-1.5 rounded  text-red-500 cursor-pointer
                      hover:text-white hover:bg-red-500 ease-in-out  duration-300
                      "
                      title="Marcar como 'Por hacer'"
                      onClick={() => {
                        handleMarkAsReady(t.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faCancel} />
                    </div>
                  )}
                  <div
                    className="border border-2 px-1.5 rounded ml-2  text-blue-500 cursor-pointer
                    hover:text-white hover:bg-blue-500  ease-in-out  duration-300
                    "
                    title="Ver detalles de la tarea"
                    onClick={() => {
                      settodoViewSelected(t);
                    }}
                  >
                                       <FontAwesomeIcon icon={faEye} />
                  </div>
                  <div
                    className="border border-2 px-1.5 rounded ml-2 text-green-500 cursor-pointer
                    hover:text-white hover:bg-green-500  ease-in-out  duration-300 "
                    title="Editar Tarea"
                    onClick={() => {
                      dispatcher(setTodoSelected(t.id));
                      dispatcher(setSelectedTab(0))
                    }}
                  >
                                       <FontAwesomeIcon icon={faEdit} />
                  </div>
                  <div
                    className="border border-2 px-1.5 rounded ml-2 text-red-500 cursor-pointer
                    hover:text-white hover:bg-red-500  ease-in-out  duration-300  "
                    title="Eliminar tarea"
                    onClick={() => {
                      handleRemove(t.id);
                      /* Lo quita del formulario de edición */
                      dispatcher(removeTodoSelected());
                    }}
                  >
                       <FontAwesomeIcon icon={faTrash} />
                  </div>
                </div>
              </div>
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
