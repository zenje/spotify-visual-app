import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducers';

const store = configureStore({
  reducer: reducer,
  // disable default middleware for better performance during development
  middleware: [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  ],
});

export default store;
