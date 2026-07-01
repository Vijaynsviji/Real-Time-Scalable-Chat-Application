import { GetReturnMessageObject } from "../Utils/helperfunctions.js";
import { Status } from "../Utils/types.js";
import * as userRepo from './UserRepo.js';




export const getUser = async (email:string) => {
    try {
        if (!email) {
            return GetReturnMessageObject(404, Status.Error,null,"Please specify email to search!!");
        }

        const allUsers =await userRepo.getUsersUsingEmail(email);
        console.log(allUsers);
        
        return  GetReturnMessageObject(200, Status.Success,allUsers,"fetch success");
    }catch (e) {
    console.error("Error in signupUser " + e);
    return GetReturnMessageObject(500, Status.Error,null,"Some thing went wrong!!!")
} 
}

export const updateUserPublicKey = async (user_id:string, publicKey: string)=>{
    try{

        const response = await userRepo.UpdateUserPublicId(user_id, publicKey);

        if(!response){
            throw("Unable to Update Public Key");
        }
        return GetReturnMessageObject(200, Status.Success,response,"Message Fetch Succes.");
    }catch(e){
        console.error("Error in updateUserPublicKey " + e);
        return GetReturnMessageObject(500, Status.Error,null,"Some thing went wrong!!!")
    }
}