import { useEffect, useState } from "react";
import { CreateTodo } from "../interfaces/createTodo";
import { SubmitHandler, useForm } from "react-hook-form";
import { Checkbox, TextField, TextareaAutosize } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/es";
import dayjs, { Dayjs } from "dayjs";
import { useStoreTodo } from "../hooks/useStoreTodo";
import { useAppDispatch, useAppSelector } from "../redux";
import ServerErrorModal from "./modal-errors";
import { showAlert } from "../redux/slices/alert";
import { removeTodoSelected } from "../redux/slices/todo";
dayjs.extend(localizedFormat);
dayjs.locale("es");

export const TodoForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateTodo>();
  const { refetch, settodoAdd, todoAdd, isFetching, error, data, isSuccess } =
    useStoreTodo();
  const { todo } = useAppSelector((state) => state);
  const dispatcher = useAppDispatch();
  const checked = watch("completed", false);
  const [datePickerdate, setDatepickerDate] = useState<Dayjs | null>(null);

  const onSubmit: SubmitHandler<CreateTodo> = (createTodo: CreateTodo) => {
    settodoAdd(createTodo);
  };

  useEffect(() => {
    if (todo.todoSelected != null) {
      const selectedTodo = todo.todoItems.filter(
        (x) => x.id == todo.todoSelected
      )[0];
      if (selectedTodo != null) {
        setValue("title", selectedTodo.title);
        setValue("description", selectedTodo.description);
        setValue("completed", selectedTodo.completed);
        setValue("date", dayjs(selectedTodo.date));
        setDatepickerDate(dayjs(selectedTodo.date));
      }
    }

    if (todo.todoSelected == null) {
      setValue("title", "");
      setValue("description", "");
      setValue("completed", false);
      setValue("date", "");
      reset();
      setDatepickerDate(null);
    }
  }, [todo.todoSelected]);

  useEffect(() => {
    if (todoAdd != null) {
      refetch();
    }
  }, [todoAdd]);

  useEffect(() => {
    if (!error && data && isSuccess) {
      dispatcher(
        showAlert({ isCreate: todo.todoSelected == null, show: true })
      );
    }
  }, [error, data, isSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col text-center">
          <h2 className="text-3xl font-bold mb-5 text-slate-700">
            Control de Tareas
          </h2>
        </div>
        {/*  */}
        <div className="mb-5">
          <label className="font-semibold text-lg text-blue-600">Título</label>
          <TextField
            id="outlined-basic"
            className="w-full bg-white rounded"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <small className="text-red-600">
              El título no puede estar vacío
            </small>
          )}
        </div>
        {/*  */}
        <div className="mb-4">
          <label className="font-semibold text-lg text-blue-600">
            Descripción
          </label>
          <TextareaAutosize
            id="outlined-basic"
            className="w-full  bg-white outline-none p-4 rounded border border-[#C4C4C4] max-h-[100px] hover:border-[#333] "
            {...register("description", { required: true, minLength: 10 })}
          />
          {errors.description && (
            <small className="text-red-600 border">
              Se debe ingresar una descripción de al menos 10 caracteres.
            </small>
          )}
        </div>
        {/*  */}
        <div className="mb-4">
          <label className="font-semibold text-lg text-blue-600">Fecha</label>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DatePicker
              className="w-full  bg-white outline-none rounded"
              value={datePickerdate}
              {...register("date", { required: true })}
              onChange={(newValue) => {
                setDatepickerDate(newValue);
                setValue("date", dayjs(newValue).format("YYYY-MM-DD"));
              }}
            />
          </LocalizationProvider>
          {errors.date && (
            <small className="text-red-600">
              La fecha no puede estar vacía
            </small>
          )}
        </div>
        {/*  */}
        <div className="font-semibold text-lg text-blue-600 mb-5 md:mb-0">
          <Checkbox
            checked={checked}
            {...register("completed")}
            className="font-semibold text-lg"
          />
          Completada
        </div>
        <button
          type="submit"
          className="mt-auto mb-2 h-[40px] inline-flex justify-center rounded-md border border-transparent bg-blue-600
          text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
           focus-visible:ring-offset-2"
          disabled={isFetching}
        >
          <span className="mt-1 text-xl font-normal">
            {todo.todoSelected ? "Guardar cambios" : "Guardar"} 
          </span>
        </button>
        {todo.todoSelected && (
          <button
            type="button"
            onClick={() => {
              dispatcher(removeTodoSelected());
              reset();
            }}
            className=" h-[40px] inline-flex justify-center rounded-md border border-transparent bg-red-600
                text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500
                 focus-visible:ring-offset-2"
            disabled={isFetching}
          >
            <span className="mt-1 text-xl font-normal">Cancelar edición</span>
          </button>
        )}
      </form>

      {error && error.response?.data && (
        <ServerErrorModal serverErrors={error.response.data} />
      )}
    </>
  );
};
