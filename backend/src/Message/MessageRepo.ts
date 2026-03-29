import { prisma } from "../Utils/prisma.js";
import { MessageBodySchema } from "./MessageSchema.js";

import { z} from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { sendMessage } from "../Utils/redis.js";

type MessageBody = z.infer<typeof MessageBodySchema>;




export const GetMessageBasedOnConversationId = async(conversation_id:string)=>{
    try{
        const allMessages = await prisma.messages.findMany({
            where:{
                conversation_id: conversation_id
            }
        });

        return allMessages;
    }catch(e){
        return [];
    }
}


export const SaveNewMessageBasedOnConversationId = async(conversation_id:string,MessageData: MessageBody)=>{
    try{
        // const allMessages = await prisma.messages.create({
        //     data:{
        //         cipher_key: MessageData?.cipher_key,
        //         message_encrypt: MessageData?.message_encrypt,
        //         status: MessageData?.status,
        //         sender_id: MessageData?.sender_id,
        //         conversation_id: conversation_id
        //     }
        // })

        const response = {
                message_id: uuidv4(),
                cipher_key: MessageData?.cipher_key,
                message_encrypt: MessageData?.message_encrypt,
                status: MessageData?.status,
                sender_id: MessageData?.sender_id,
                conversation_id: conversation_id
            }

            const stringfiedResponse = JSON.stringify({
                type: "SaveMessage",
                Data: response
            })

            sendMessage(stringfiedResponse);

        return response;
    }catch(e){
        return [];
    }
}


export const UpdateMessageBasedOnConversationIdAndMessageId = async (conversation_id:string,message_id: string,cipher_key:string,message_encrypt:string)=>{
    try{
        // const updatedMessage = await prisma.messages.update({
        //     where:{
        //         message_id:message_id, 
        //     },
        //     data:{
        //         cipher_key: cipher_key,
        //         message_encrypt: message_encrypt
        //     }
        // })

        const response = {
                message_id: message_id,
                cipher_key: cipher_key,
                message_encrypt: message_encrypt
            }

        const stringfiedResponse = JSON.stringify({
            type: "UpdateMessage",
            Data: response
        })

        sendMessage(stringfiedResponse);

        return response;
    }catch(e){
        return [];
    }
}


export const DeleteMessageBasedOnConversationIdOrMessageId = async (conversation_id:string,message_id: string)=>{
    try{
        // const DeletedMessage = await prisma.messages.delete({
        //     where:{
        //         message_id:message_id, 
        //     }
        // })

        const response = {
            message_id: message_id
        }

        const stringfiedResponse = JSON.stringify({
            type: "DeleteMessage",
            Data: response,
        })
        sendMessage(stringfiedResponse);

        return response;
    }catch(e){
        return [];
    }
}