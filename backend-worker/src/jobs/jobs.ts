import { prisma } from "../prisma/prismautils.js";


export const SaveUser = async (user:any)=>{
    try{

        const response = await prisma.user.create({
            data: {
                user_id: user?.user_id,
                first_name: user?.first_name,
                last_name: user?.last_name,
                email: user?.email,
                password:  user?.password
            }
        });
        return response;
    }catch(e){
        console.error("Error in SaveUser " + e);
        return {};
    }
}



export const SaveConversation = async (conversation:any)=>{
    try{

       const newConversation = await prisma.conversation.create({
            data: {
                type: conversation?.type,
                conversation_id: conversation?.conversation_id
            }
        })
        const responseUser1 = await prisma.conversationParticipants.create({
            data: {
                participant_id: conversation?.firstParticipant_id,
                user_id: conversation?.user_id1,
                conversation_id: conversation?.conversation_id
            }
        });

        const responseUser2  = await prisma.conversationParticipants.create({
            data: {
                participant_id: conversation?.secondParticipant_id,
                user_id: conversation?.user_id2,
                conversation_id: newConversation.conversation_id
            }
        })

        return {
            newConversation: newConversation,
            responseUser1: responseUser1,
            responseUser2: responseUser2,
        }
    }catch(e){
        console.error("Error in SaveUser " + e);
        return {};
    }
}


export const SaveNewMessageBasedOnConversationId = async (message:any)=>{
    try{

       const response = await prisma.messages.create({
            data:{
                message_id: message?.message_id,
                cipher_key: message?.cipher_key,
                message_encrypt: message?.message_encrypt,
                status: message?.status,
                sender_id: message?.sender_id,
                conversation_id: message?.conversation_id
            }
        })


        return response;
    }catch(e){
        console.error("Error in SaveUser " + e);
        return {};
    }
}


export const UpdateMessageBasedOnConversationIdAndMessageId = async (message:any)=>{
    try{

      const updatedMessage = await prisma.messages.update({
            where:{
                message_id:message?.message_id, 
            },
            data:{
                cipher_key: message?.cipher_key,
                message_encrypt: message?. message_encrypt
            }
        })


        return updatedMessage;
    }catch(e){
        console.error("Error in SaveUser " + e);
        return {};
    }
}


export const DeleteMessageBasedOnConversationIdOrMessageId = async (message:any)=>{
    try{

     const DeletedMessage = await prisma.messages.delete({
            where:{
                message_id: message?.message_id, 
            }
        })


        return DeletedMessage;
    }catch(e){
        console.error("Error in SaveUser " + e);
        return {};
    }
}


