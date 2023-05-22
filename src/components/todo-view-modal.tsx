import { Todo } from "../interfaces/todo";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { formatDate } from "../helpers/formatDate";
import { TodoStatus } from "./todo-status";
export const TodoViewModal = ({
  todo,
  settodoViewSelected,
}: {
  todo: Todo;
  settodoViewSelected: React.Dispatch<React.SetStateAction<Todo | null>>;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    settodoViewSelected(null);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6
               text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title className={'text-center'}>
                  <span className="text-xl font-semibold text-blue-500 text-center">
                    Detalles de la tarea
                  </span>
                </Dialog.Title>
                <div className="my-6 flex flex-col">
                  <div className="flex flex-row border-b break-words">
                    <span className="font-bold mr-2 ">Titulo: </span>
                    <span className="">{todo.title} </span>
                  </div>
                  <div className="flex flex-col border-b break-words">
                    <span className="font-bold mr-2">Descripción: </span>
                    <span className="">
                    {todo.description}
                    </span>
                  </div>
                  <div className="flex flex-row border-b ">
                    <span className="font-bold mr-2">Fecha: </span>
                    <span className="">{formatDate(todo.date)} </span>
                  </div>
                  <div className="flex flex-row  ">
                    <span className="font-bold mr-2">Estado: </span>
                    <TodoStatus status={todo.completed}/>
                  </div>
                </div>
                <div className="mt-4 flex justify-end ">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600
                     px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 
                     focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Salir
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
