import { createSlice } from '@reduxjs/toolkit';
import type { Status } from '../../utils/types/Types';

export interface CurrentUser{
    user_id: string | number | null,
    Name: string | null,
    email: string | null,
    isOnline: Status,
    privateKey?: string | null
    publicKey?: string | null,
    first_name?: string | null
}

const initialState = {
    currentUser: {} as CurrentUser,
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed'
}

export const userSlice = createSlice({
  name: 'currentUser',
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action) => { state.currentUser = action.payload; },
    setCurrentUserKeys: (state,action)=>{
      if(!action.payload) return;
      state.currentUser = {...state.currentUser, ...action.payload};
    },
    setCurrentUserStatus: (state, action)=>{
      if(!action.payload) return;
      state.status = action.payload.status;
    }
  },
});

export const { setCurrentUser,setCurrentUserKeys,setCurrentUserStatus } = userSlice.actions;
export default userSlice.reducer;
