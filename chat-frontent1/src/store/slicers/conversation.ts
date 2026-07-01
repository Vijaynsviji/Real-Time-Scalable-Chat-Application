import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Contact, ContactCardProp } from '../../components/home/sidebar/contactlist';
import type { Message } from '../../utils/types/Types';
import axios from 'axios';
import { DecryptMessage } from '../../utils/HelperFunctions';
import { apiBaseUrl } from '../../config/api';
import type { CurrentUser } from './users';
import type { RootState } from '../store';


interface ConversationMap {
    [key:string]: ContactCardProp
}


const initialState = {
    conversations: {} as ConversationMap,
    selectedContact: {} as Contact | null,
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null as string | null,
}

   const processEncryptedMessageAndConvertToTextMessage = async (messages:Message[],currentUserDetails:CurrentUser)=>{
        try{

            if(!messages) return [];

            const DecryptedMessageObject:Message[] = [];

            for(let i=0;i<messages?.length;i++){
                const currentMessage = messages[i];
                const DecryptedMessageText = await DecryptMessage(currentMessage,currentUserDetails);

                if(!DecryptedMessageText) continue;
                DecryptedMessageObject.push({
                    ...currentMessage,
                    message_encrypt: DecryptedMessageText
                })
            }

            return DecryptedMessageObject;
        }catch(e){
            console.error("Error in processEncryptedMessageAndConvertToTextMessage " + e);
            return [];
        }
}

const FetchAllConversation = async (
  _: void,
  { getState }: { getState: () => RootState }
)=>{
        try{
            const state = getState() as RootState;
            const currentUserDetails = state?.user?.currentUser;
            if(!currentUserDetails) return;
            const userId = currentUserDetails?.user_id;
            const response = await axios.get(`${apiBaseUrl}/conversations/${userId}`
        )

            if(response.status==200){
                const conversationList = response?.data;
                // setSearchedContact(conversationList?.data);

                const conversationMap:any = {};
                if(conversationList?.data){
                    for(let item of conversationList?.data){
                        
                        const allDecryptedMessages = await processEncryptedMessageAndConvertToTextMessage(item?.messages,currentUserDetails);
                        
                        conversationMap[item?.conversation_id] = {
                            ...item,
                            messages: allDecryptedMessages
                        }

                    }
                }
                return conversationMap;
            }
            return [];
        }catch(e){
            console.error("Error in FetchAllConversation " + e);
            return [];
        }
    }

export const fetchConversations = createAsyncThunk<
  ConversationMap, // Return type
  void,            // Argument type
  { state: RootState }
>(
  'conversationsMap/fetchConversations',
  FetchAllConversation
);

const createDefaultContactWithGivenData = (conversation_id:string,sender_id:string,currentUserDetails:CurrentUser)=>{
    const defaultContact: ContactCardProp = {
      id: sender_id,
      isOnline: false,
      email: currentUserDetails?.email,
      Name: currentUserDetails?.first_name || "Unknow User",
      conversation_id: conversation_id,
      messages: [],
      public_key: currentUserDetails?.publicKey,
      unReadMessageCount: 0,
      lastMessage: undefined,
      lastMessageDate: undefined,
    };

    return defaultContact;
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
        if(!currentConversation){
            const messageSenderUserDetails = message?.currentUserDetails;
            currentConversation = createDefaultContactWithGivenData(ConversationId,message?.sender_id,messageSenderUserDetails);
        }

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
extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch conversations';
      });
  },

});

export const { setConversations,setConversationMessages,setSelectedStoreContact } = ConversationSlice.actions;
export default ConversationSlice.reducer;
