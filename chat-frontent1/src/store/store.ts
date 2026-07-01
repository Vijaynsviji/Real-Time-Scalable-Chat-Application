import { configureStore } from '@reduxjs/toolkit';
import userSlice  from './slicers/users';
import ConversationSlice  from './slicers/conversation';


export const store = configureStore({
  reducer: { 
    user: userSlice,
    conversations: ConversationSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
