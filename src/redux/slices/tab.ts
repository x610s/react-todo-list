import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TabState {
  tabSelected: number ;
}
export const initialState: TabState = {
    tabSelected: 0
};

const tabSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<number>) => {
      state.tabSelected = action.payload;
    },
  },
});

export const { setSelectedTab } = tabSlice.actions;
export default tabSlice.reducer;
