import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./features/notes";

export const store = configureStore({
  reducer: {
    notesSlice
  },
});
