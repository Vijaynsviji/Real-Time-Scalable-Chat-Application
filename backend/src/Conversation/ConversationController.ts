import { response } from "express";
import { prisma } from "../Utils/prisma.js";
import * as ConversationService from './ConversationService.js';



export const GetAllConverationForParticularUser = async (req:any, res:any)=>{
    try{
        if(!req || !res) return null;
        const UserId = req.query.userId;

        if(UserId){
            return res.status(404).json({
                message: "Please Give Valid User Id."
            });
        }

        const AllConversationList = await ConversationService.FetchAllConversationForUser(UserId);

        return res.status(AllConversationList.statusCode).json({
            message: AllConversationList.statusText,
            data: AllConversationList.data
        })

    }catch(e){
        console.error("Error in GetAllConverationForParticularUser " + e);
        return res.status(500).json({
            message: "Some thing went wrong",
            data: null
        })
    }
}


export const GetConversationBasedOnId = async (req:any, res:any)=>{
    try{
        if(!req || !res) return null;
        const conversation_id = req.query.conversation_id;

        if(conversation_id){
            return res.status(404).json({
                message: "Please Give Valid conversation Id."
            });
        }

        const ConversationWithGivenId = await ConversationService.FetchConversationUsingId(conversation_id);

        return res.status(ConversationWithGivenId.statusCode).json({
            message: ConversationWithGivenId.statusText,
            data: ConversationWithGivenId.data
        })

    }catch(e){
        console.error("Error in GetAllConverationForParticularUser " + e);
        return res.status(500).json({
            message: "Some thing went wrong",
            data: null
        })
    }
}


export const addConversation = async (req:any,res:any)=>{
    try{
        if(!req || !res) return null;
        const UserIdData = req.body;
        if(!UserIdData || typeof UserIdData !== "object" || (!UserIdData?.user1 || !UserIdData?.user2)){
            return res.status(404).json({
                message: "Please Give valid User id's to create Conversation."
            });
        }
        const addConversationResponse = await ConversationService.addConversation(UserIdData?.user1, UserIdData?.user2);
    
    }catch(e){
        console.error("Error in addConversation " + e);
        return res.status(500).json({
            message: "Some thing went wrong",
            data: null
        })
    }
}