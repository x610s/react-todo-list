import { formatDate } from "../helpers/formatDate";
import { useAppDispatch } from "../redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faCheck,
  faEdit,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { removeTodoSelected, setTodoSelected } from "../redux/slices/todo";
import { setSelectedTab } from "../redux/slices/tab";
import { TodoBoxType } from "../interfaces/todoBox";

export const TodoBox = ({
  todo,
  deleteTodo,
  markTodoAsReady,
  settodoViewSelected,
}: TodoBoxType) => {
  const dispatcher = useAppDispatch();

  const handleRemove = (id: number) => {
    deleteTodo.mutate(id);
  };
  const handleMarkAsReady = (id: number) => {
    markTodoAsReady.mutate(id);
  };

  return (
    <div
      className={`${
        todo.completed ? "bg-green-50" : "bg-white"
      }  p-4 border-b flex flex-row justify-between md:grid-cols-2 grid grid-cols-1`}
    >
      <div className="flex flex-col">
        <span>{todo.title}</span>
        <small className="text-slate-400">{formatDate(todo.date)}</small>
      </div>
      <div className="flex flex-row  sm:justify-center justify-center md:justify-end    md:mt-3  items-center">
        {todo.completed ? (
          <div
            className="border border-2 px-1.5 rounded  text-sky-400 cursor-pointer
           hover:text-white hover:bg-sky-400 ease-in-out  duration-300"
            title="Marcar como 'Completada'"
            onClick={() => {
              handleMarkAsReady(todo.id);
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
              handleMarkAsReady(todo.id);
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
            settodoViewSelected(todo);
          }}
        >
          <FontAwesomeIcon icon={faEye} />
        </div>
        <div
          className="border border-2 px-1.5 rounded ml-2 text-green-500 cursor-pointer
        hover:text-white hover:bg-green-500  ease-in-out  duration-300 "
          title="Editar Tarea"
          onClick={() => {
            dispatcher(setTodoSelected(todo.id));
            dispatcher(setSelectedTab(0));
            //Scrolear al principio por si está en vista mobile no tenga que subir
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </div>
        <div
          className="border border-2 px-1.5 rounded ml-2 text-red-500 cursor-pointer
        hover:text-white hover:bg-red-500  ease-in-out  duration-300  "
          title="Eliminar tarea"
          onClick={() => {
            handleRemove(todo.id);
            /* Lo quita del formulario de edición */
            dispatcher(removeTodoSelected());
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    </div>
  );
};
