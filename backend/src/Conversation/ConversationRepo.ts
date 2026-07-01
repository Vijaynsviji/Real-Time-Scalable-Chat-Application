import { prisma } from "../Utils/prisma.js";
import { v4 as uuidv4 } from 'uuid';
import { sendMessage } from "../Utils/redis.js";



export const getAllConversationUsingUserId = async (UserId: string)=>{
    try{
        const response =  await prisma.conversationParticipants.findMany({
            where:{
                user_id: UserId
            },
            select:{
                user: {
                    select: {
                        user_id: true,
                        email: true,
                        first_name: true,
                        public_key: true,
                    }
                },
                conversation_id: true,
                conversation:{
                    select:{
                        type: true,
                        last_message: true,
                         messages: {
                            take: 20,
                            orderBy: {
                                message_id: "desc",
                            },
                        },
                        last_message_id: true,
                        participants: {
                            select: {
                                user: true
                            }
                        },
                    }
                },
                
            }
        })

        const conversationData = response?.map(item=>{
            if(!item?.conversation?.participants || !Array.isArray(item?.conversation?.participants)) return null;
            const participant = item?.conversation?.participants?.filter(participant=>participant.user.user_id!=UserId);
            if(participant && participant?.length>0){
                return {
                    id: participant?.[0]?.user?.user_id,
                    conversation_id: item?.conversation_id,
                    email: participant?.[0]?.user?.email,
                    Name: participant?.[0]?.user?.first_name,
                    isOnline: true,
                    messages: item?.conversation?.messages,
                    lastMessage: item?.conversation?.last_message,
                    public_key: participant?.[0]?.user?.public_key
                }
            }
            return null;
        }).filter(Boolean)

        

        return conversationData || [];
    }catch(e){
        return false;
    }
}


export const getParticularConversationUsingId = async (conversation_id: string)=>{
    try{
        const response =  prisma.conversation.findMany({
            where:{
                conversation_id: conversation_id
            }
        })
        return response;
    }catch(e){
        return false;
    }
}

export const getConversationParticipantUsingUserId = async (user_id: string)=>{
    try{
        const response =  prisma.conversationParticipants.findMany({
            where:{
                user_id: user_id
            }
        })
        return response;
    }catch(e){
        return [];
    }
}


export const SaveConversation = async (user1: string,user2: string)=>{
    try{
        // const parsedUserId = Number(user1);
        // const parsedUserId2 = Number(user2);
        // const newConversation = await prisma.conversation.create({
        //     data: {
        //         type: "Personal",
        //     }
        // })
        // const responseUser1 = await prisma.conversationParticipants.create({
        //     data: {
        //         user_id: parsedUserId,
        //         conversation_id: newConversation?.conversation_id
        //     }
        // });

        // const responseUser2  = await prisma.conversationParticipants.create({
        //     data: {
        //         user_id: parsedUserId2,
        //         conversation_id: newConversation.conversation_id
        //     }
        // })

        const getUserPublicKey = await prisma.user.findFirst({
            where:{
                user_id: user2
            }
        })

        const ConversationId = uuidv4();
        const firstParticipant = uuidv4();
        const secondParticipant = uuidv4();

        const response = {
            type: "Personal",
            conversation_id: ConversationId,
            user_id1: user1,
            firstParticipant_id: firstParticipant,
            user_id2: user2,
            secondParticipant_id: secondParticipant,
            public_key: getUserPublicKey?.public_key,
        }

        const stringfiedResponse = JSON.stringify(
            {
            type: "SaveConversation",
            Data: response
        }
        );

        sendMessage(stringfiedResponse);


        return response;
    }catch(e){
        return [];
    }
}