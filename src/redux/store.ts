import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todo'
import alertReducer from './slices/alert'
import tabReducer from './slices/tab'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    alert: alertReducer,
    tab: tabReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;