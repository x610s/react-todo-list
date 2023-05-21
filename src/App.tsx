import { useEffect,  useRef, useState } from "react";
import { TodoForm } from "./components/todo-form";
import { TodoList } from "./components/todo-list";
import { Succesfully } from "./components/todo-succesfully";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "./redux";
import { removeAlert } from "./redux/slices/alert";
import { Tab } from "@headlessui/react";
import { setSelectedTab } from "./redux/slices/tab";
import { removeTodoSelected } from "./redux/slices/todo";

function App() {
  const { alert,tab } = useAppSelector((state) => state);
  const dispatcher = useAppDispatch();
  const refContainer = useRef<HTMLDivElement>();
  const [isPhone, setIsPhone] = useState<boolean>();

  useEffect(() => {
    if (alert.modal && alert.modal.show) {
      setTimeout(() => {
        dispatcher(removeAlert());
        dispatcher(removeTodoSelected())
      }, 2500);
    }
  }, [alert.modal]);

  const  handleResize =() => {
    if(window.innerWidth<=426){
      setIsPhone( true);
    }else{
      setIsPhone(false)
    }
  }

  //#region  Codigo que se escucharía una sola vez(al cargar la aplicación)   
  //  useEffect(() => {
  //  if (
  //    refContainer.current &&
  //    refContainer.current.getBoundingClientRect().width <= 426
  //  ) {
  //    setIsPhone(true);
  //  }
  //}, []); 
  //#endregion
  /* 
    NOTA: esto se pudiera ejecutar una sola vez con el metodo que tengo comentado arriba
    pero para la prueba voy a dejar que escuche cuando hace un resize
  */
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  return (
    <div ref={refContainer} className=" bg-slate-800 min-h-screen ">
      <div className="flex justify-center items-center py-[4.5rem] ">
        <div
          className="bg-gray-200 p-5 rounded-lg grid md:grid-cols-2 sm:grid-cols-1 xl:min-h-[602px] min-h-[200px]  mx-5 sm:mx-[5.5rem] 
          gap-5 max-w-screen-lg w-full"
        >
          {/* Vista Desktop */}
          {!isPhone && (
            <>
              {alert.modal?.show ? (
                <Succesfully isCreated={alert.modal.isCreate} />
              ) : (
                <TodoForm />
              )}

              <TodoList />
            </>
          )}
          {/* Vista Mobile */}
          {isPhone && (
            <>
              <Tab.Group selectedIndex={tab.tabSelected}>
                <Tab.List
                  className="justify-center flex flex-row flex space-x-1 rounded-md bg-slate-800 p-2"
                >
                  <Tab
                    className={`w-full py-2.5 text-sm font-medium leading-5 
                ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 
                 ${(tab.tabSelected == 0 ? 'bg-white text-slate-700 rounded' : 'text-white')} `}
                 onClick={()=>dispatcher(setSelectedTab(0))}
                  >
                   Agregar Tarea 
                  </Tab>
                  <Tab
                  className={`w-full py-2.5 text-sm font-medium leading-5 
                  ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 
                   ${(tab.tabSelected  == 1 ? 'bg-white text-slate-700  rounded-md' : 'text-white')}`}
                 onClick={()=>dispatcher(setSelectedTab(1))}
                  >
                    Ver Tareas 
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    {alert.modal?.show ? (
                      <Succesfully isCreated={alert.modal.isCreate} />
                    ) : (
                      <TodoForm />
                    )}
                  </Tab.Panel>
                  <Tab.Panel>
                    <TodoList />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
