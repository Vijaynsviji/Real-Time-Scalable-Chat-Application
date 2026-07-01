
import {prisma} from '../Utils/prisma.js';
import { sendMessage } from '../Utils/redis.js';

export const getUsersUsingEmail = async (email:string)=>{
    try{
        const response = await prisma.user.findFirst({
            where: {
                email:email,
            }
        });

        const responseData = {
            ...response, user_id: response?.user_id?.toString()
        }
        return responseData;
    }catch(e){
        return false;
    }
}

export const checkValidUserOrNot = async (userId: string)=>{
    try{
        const response = await prisma.user.findFirst({
            where: {
                user_id: userId
            }
        })

        if(!response) return false;
        return true;

    }catch(e){
        console.error("Error in checkValidUserOrNot " + e);
        return false;
    }
}

export const UpdateUserPublicId = async (user_id:string, publicKey:string)=>{
    try{

        const updateBody = {
            user_id: user_id,
            publicKey: publicKey
        }

        const job = JSON.stringify({
            type: "UpdateUserPublicKey",
            Data: updateBody
        })

        sendMessage(job);
        return true
    }catch(e){
        console.error("Error in UpdateUserPublicId " + e);
        return false;
    }
}