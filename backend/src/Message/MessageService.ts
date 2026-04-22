import { GetReturnMessageObject } from "../Utils/helperfunctions.js";
import { Status } from "../Utils/types.js";

import * as MessageRepo from './MessageRepo.js';
import { MessageBodySchema } from "./MessageSchema.js";

import { z } from "zod";

type MessageBody = z.infer<typeof MessageBodySchema>;



export const FetchAllMessagesForConversationId = async (conversation_id:string)=>{
    try{

        const AllMessages  = await MessageRepo.GetMessageBasedOnConversationId(conversation_id);
        return GetReturnMessageObject(200, Status.Success,AllMessages,"Message Fetch Succes.");
    }catch(e){
        console.error("Error in signupUser " + e);
        return GetReturnMessageObject(500, Status.Error,null,"Some thing went wrong!!!")
    }
}


export const SaveNewMessageForConversationId = async (conversation_id:string,MessageData: MessageBody)=>{
    try{

        const AllMessages  = await MessageRepo.SaveNewMessageBasedOnConversationId(conversation_id,MessageData);
        return GetReturnMessageObject(200, Status.Success,AllMessages,"Message Saved Succes.");
    }catch(e){
        console.error("Error in signupUser " + e);
        return GetReturnMessageObject(500, Status.Error,null,"Some thing went wrong!!!")
    }
}


export const UpdateMessageTextBasedOnMessageId = async (conversation_id:string,message_id: string,cipher_key:string,message_encrypt:string)=>{
    try{

        const updatedMessage  = await MessageRepo.UpdateMessageBasedOnConversationIdAndMessageId(conversation_id,message_id,cipher_key,message_encrypt);
        return GetReturnMessageObject(200, Status.Success,updatedMessage,"Message Update Succes.");
    }catch(e){
        console.error("Error in signupUser " + e);
        return GetReturnMessageObject(500, Status.Error,null,"Some thing went wrong!!!")
    }
}

export const DeleteMessage = async (conversation_id:string,message_id: string)=>{
    try{

        const DeletedMessage  = await MessageRepo.DeleteMessageBasedOnConversationIdOrMessageId(conversation_id,message_id);
        return GetReturnMessageObject(200, Status.Success,DeletedMessage,"Message Delete Succes.");
    }catch(e){
        console.error("Error in signupUser " + e);
        return GetReturnMessageObject(500, Status.Error,null,"Some thing went wrong!!!")
    }
}