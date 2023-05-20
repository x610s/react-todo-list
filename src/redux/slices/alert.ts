import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompletedFormModal } from "../../interfaces/completedFormModal";

export interface CompletedFormModalState {
  modal: CompletedFormModal | null;
}
export const initialState: CompletedFormModalState = {
  modal: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<CompletedFormModal>) => {
      state.modal = action.payload;
    },
    removeAlert: (state, action: PayloadAction<void>) => {
      if (state.modal) {
        state.modal.isCreate = false;
        state.modal.show = false;
      }
    },
  },
});

export const { removeAlert,showAlert } = alertSlice.actions;
export default alertSlice.reducer;
