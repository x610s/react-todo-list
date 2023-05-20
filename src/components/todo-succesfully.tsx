import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../redux";
import { removeAlert } from "../redux/slices/alert";

export const Succesfully = ({ isCreated }: { isCreated: boolean }) => {
  const dispatcher = useAppDispatch();

  return (
    <div className="flex flex-col ">
      <div className=" flex flex-col text-center justify-center py-[5rem] sm:pt-[10rem]">
        <FontAwesomeIcon
          icon={faCircleCheck}
          bounce
          className="text-9xl text-green-500"
        />
        <span className="text-2xl my-3 text-green-500 font-semibold">
          Tarea {isCreated ? "creada" : "editada"} exitosamente!!
        </span>
      </div>
      <button
        onClick={() => {
          dispatcher(removeAlert());
        }}
        type="submit"
        className="mt-auto h-[40px] inline-flex justify-center rounded-md border border-transparent bg-blue-600
        text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
         focus-visible:ring-offset-2"
      >
        <span className="mt-1 text-xl font-normal">Añadir nueva tarea</span>
      </button>
    </div>
  );
};
