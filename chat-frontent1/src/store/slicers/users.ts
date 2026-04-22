import { createSlice } from '@reduxjs/toolkit';
import type { Status } from '../../utils/types/Types';

export interface CurrentUser{
    user_id: string | number | null,
    Name: string | null,
    email: string | null,
    isOnline: Status
}

const initialState = {
    currentUser: {} as CurrentUser,
}

export const userSlice = createSlice({
  name: 'currentUser',
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action) => { state.currentUser = action.payload; },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
