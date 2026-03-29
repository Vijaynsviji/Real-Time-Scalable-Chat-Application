import {prisma} from '../Utils/prisma.js';
import { userSignUp } from './AuthController.js';
import bcrypt from 'bcrypt';
import "dotenv/config";
import { v4 as uuidv4 } from 'uuid';
import { sendMessage } from '../Utils/redis.js';



export const saveUser = async (user:userSignUp)=>{
    try{

        const saltRounds = Number(process.env["SALT_ROUNDS"]);

        const hashedPassword = await bcrypt.hash(user.password,  saltRounds|| 10);

        // const response = await prisma.user.create({
        //     data: {
        //         first_name: user?.first_name,
        //         last_name: user?.last_name,
        //         email: user?.email,
        //         password:  hashedPassword
        //     }
        // });

        const response = {
                user_id: uuidv4(),
                first_name: user?.first_name,
                last_name: user?.last_name,
                email: user?.email,
                password:  hashedPassword
            }
        const StringifiedResponse = JSON.stringify({
            type: "SaveUser",
            Data: response
        })
        sendMessage(StringifiedResponse);

        const {password, ...remainData} = response;
        return remainData;
    }catch(e){
        console.error("Error in SignIn " + e);
        return null;
    } 
}


export const findUserPresentOrNot = async (email:string)=>{
    try{
        const response = await prisma.user.findFirst({
            where: {
                email:email,
            }
        })
        return response;
    }catch(e){
        return null;
    }
}