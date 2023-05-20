import { Dayjs } from "dayjs";

export interface CreateTodo {
  title: string;
  description: string;
  date:   Dayjs | string;
  completed: boolean;
}
