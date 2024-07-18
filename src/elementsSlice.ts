import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Element = {
  id: number;
  color: string;
};

type ElementsState = {
  elements: Element[];
};

const initialState: ElementsState = {
  elements: [],
};

export const elementsSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<Element>) => {
      state.elements.unshift(action.payload);
    },
    removeElement: (state, action: PayloadAction<number>) => {
      state.elements = state.elements.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addElement, removeElement } = elementsSlice.actions;

export default elementsSlice.reducer;
