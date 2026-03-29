import { configureStore } from '@reduxjs/toolkit';
import userSlice  from './slicers/users';


export const store = configureStore({
  reducer: { user: userSlice },
});
