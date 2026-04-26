import { createSlice } from '@reduxjs/toolkit';
import type { ContactCardProp } from '../../components/home/sidebar/contactlist';
import type { Message } from '../../utils/types/Types';


interface ConversationMap {
    [key:string]: ContactCardProp
}


const initialState = {
    conversations: {} as ConversationMap,
}

export const ConversationSlice = createSlice({
  name: 'conversationsMap',
  initialState: initialState,
  reducers: {
    setConversations: (state, action) => { state.conversations = action.payload; },
    setConversationMessages: (state, action)=>{
        const ConversationId = action.payload.conversation_id;
        const message = action.payload.message;
        let currentConversation = state.conversations[ConversationId];
        if(currentConversation?.messages && Array.isArray(currentConversation?.messages)){
            currentConversation.messages = [...currentConversation?.messages,message];
        }
        state.conversations = {
            ...state.conversations,
            [ConversationId] : {
                ...currentConversation
            }
        }
    }
  },
});

export const { setConversations,setConversationMessages } = ConversationSlice.actions;
export default ConversationSlice.reducer;
