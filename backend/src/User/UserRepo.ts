
import {prisma} from '../Utils/prisma.js';

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