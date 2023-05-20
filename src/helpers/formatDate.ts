import dayjs, { Dayjs } from "dayjs"

export const formatDate = (date: string | Dayjs ): string =>{
    return dayjs(date).format("DD/MM/YYYY");
}