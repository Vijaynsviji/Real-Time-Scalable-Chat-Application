import { GetReturnMessageObject } from "../Utils/helperfunctions.js";
import { Status } from "../Utils/types.js";

import * as ConversationRepo from './ConversationRepo.js';



export const FetchAllConversationForUser = async (userId: string )=>{
    try{
    
        const allConversationForUser = await ConversationRepo.getAllConversationUsingUserId(userId);
        return GetReturnMessageObject(200, Status.Success,allConversationForUser,"Fetch All Converation Success.");
    }catch(e){
        console.error("Error in signupUser " + e);
        return GetReturnMessageObject(500, Status.Error,null,"Some thing went wrong!!!")
    }
}


export const FetchConversationUsingId = async (conversation_id: string )=>{
    try{
        const conversationUsingId = await ConversationRepo.getParticularConversationUsingId(conversation_id);
        return GetReturnMessageObject(200, Status.Success,conversationUsingId,"Fetch All Converation Success.");
    }catch(e){
        console.error("Error in signupUser " + e);
        return GetReturnMessageObject(500, Status.Error,null,"Some thing went wrong!!!")
    }
}


export const addConversation = async (user1: string , user2: string )=>{
    try{
        const AllConversationUserIdSet = new Set();
        const allConversationForGivenUserId = await ConversationRepo.getConversationParticipantUsingUserId(user1);
        allConversationForGivenUserId?.map(item=>{
            if(item?.user_id){
                AllConversationUserIdSet.add(item?.conversation_id);
            }
        })

        const allConversationForOtherUserId = await ConversationRepo.getConversationParticipantUsingUserId(user2);
        allConversationForOtherUserId?.map(item=>{
            if(AllConversationUserIdSet.has(item?.conversation_id)){
                return GetReturnMessageObject(404, Status.Error,null,"Already have an Conversation Record.");
            }
        });

        const NewConversation = await ConversationRepo.SaveConversation(user1,user2);

        return GetReturnMessageObject(200, Status.Success,NewConversation,"New Conversation Created.");
    }catch(e){
        console.error("Error in signupUser " + e);
        return GetReturnMessageObject(500, Status.Error,null,"Some thing went wrong!!!")
    }
}