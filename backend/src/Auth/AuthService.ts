import { email } from "zod";
import { GetReturnMessageObject, safeJSONParse } from "../Utils/helperfunctions.js";
import { Status } from "../Utils/types.js";
import { userSignIn, userSignUp } from "./AuthController.js";
import * as authRepo  from "./AuthRepo.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { prisma } from "../Utils/prisma.js";




/*

1. All the function will return a object.
2. Object = {
    StatusCode: code,
    data: [] | {} | null | "" | 0, 
    Status: "Success" | "Error",
    StatusText: "Error Message or Success Message"
}

 */

export const signupUser = async (user: userSignUp) => {
    try {
        if (!user) {
            return GetReturnMessageObject(404, Status.Error,null,"Please Enter Valid Inputs");
        }
        const userPresentOrNot = await authRepo.findUserPresentOrNot(user?.email);
        if(userPresentOrNot) return GetReturnMessageObject(404, Status.Error,null,"User with given email present!");

        const response = await authRepo.saveUser(user);

        if(!response) return GetReturnMessageObject(500, Status.Error,null,"Some thing went wrong!!!");

        const signUpResponseData = {
            first_name: response?.first_name,
            last_name: response?.last_name,
            email: response?.email,
            // created_at: response?.created_at
        }
        
        return  GetReturnMessageObject(200, Status.Success,signUpResponseData,"SignUp Success");
    }catch (e) {
    console.error("Error in signupUser " + e);
    return GetReturnMessageObject(500, Status.Error,null,"Some thing went wrong!!!");
} 
}


export const signInUser = async (user: userSignIn) => {
    try {
        if (!user) {
            return GetReturnMessageObject(404, Status.Error,null,"Please Enter Valid Inputs");
        }
        const userPresentOrNot = await authRepo.findUserPresentOrNot(user?.email);
        if(!userPresentOrNot) return GetReturnMessageObject(404, Status.Error,null,"User with given email not found!!");
        const password = user.password;
        const isStoredPasswordEqual = await bcrypt.compare(password,userPresentOrNot.password);
        if(!isStoredPasswordEqual){
            return GetReturnMessageObject(404, Status.Error,null,"Please enter correct password!!!");
        }

        const token = jwt.sign({ email: userPresentOrNot.email, user_id: userPresentOrNot.user_id.toString() }, process.env['JWT_SECRETE'] || "JWT");
        const signInResponseData = {
            token: token,
        }

        return  GetReturnMessageObject(200, Status.Success,signInResponseData,"SignIn Success");
    }catch (e) {
    console.error("Error in signupUser " + e);
    return GetReturnMessageObject(500, Status.Error,null,"Some thing went wrong!!!")
} 
}


export const verifynUser = async (token: string) => {
    try {
        if (!token) {
            return GetReturnMessageObject(404, Status.Error,null,"No valid token to verfiy!!");
        }
        
        const decoded = jwt.verify(token,process.env['JWT_SECRETE'] || "JWT");
        const parsedInfo = safeJSONParse<any>(decoded,{});
        const currentUser = await prisma.user.findFirst({
            where:{
                email: parsedInfo?.email || ""
            }
        })

        return  GetReturnMessageObject(200, Status.Success,{...currentUser,user_id:currentUser?.user_id.toLocaleString()},"User Verified!");
    }catch (e) {
    console.error("Error in signupUser " + e);
    return GetReturnMessageObject(404, Status.Error,null,"InValid Token")
} 
}