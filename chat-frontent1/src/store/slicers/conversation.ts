import { createSlice } from '@reduxjs/toolkit';
import type { Contact, ContactCardProp } from '../../components/home/sidebar/contactlist';
import type { Message } from '../../utils/types/Types';


interface ConversationMap {
    [key:string]: ContactCardProp
}


const initialState = {
    conversations: {} as ConversationMap,
    selectedContact: {} as Contact | null
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
    },
    setSelectedStoreContact: (state,action)=>{
        state.selectedContact = action.payload.selectedContact;
    }
  },
});

export const { setConversations,setConversationMessages,setSelectedStoreContact } = ConversationSlice.actions;
export default ConversationSlice.reducer;
