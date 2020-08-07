import { configureStore } from '@reduxjs/toolkit';
//import rootReducer from './reducers';
import reducer from './reducers';

const store = configureStore({
  reducer: reducer,
});

export default store;
