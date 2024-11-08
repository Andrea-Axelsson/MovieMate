import { configureStore } from '@reduxjs/toolkit';
import inputReducer from '../features/inputs/inputSlice';

export const store = configureStore({
  reducer: {
    input: inputReducer, // Lägg till andra reducerare här om du har fler features
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;