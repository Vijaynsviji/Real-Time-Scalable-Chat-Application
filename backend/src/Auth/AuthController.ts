import { UserSignInReqSchema, UserSignUpReqSchema } from "./AuthSchema.js";
import express from 'express';
import {z} from 'zod';

import * as authService from './AuthService.js';



export type userSignUp = z.infer<typeof UserSignUpReqSchema>;
export type userSignIn = z.infer<typeof UserSignInReqSchema>

export const signup = async (req:any,res:any)=>{
    try{
        if(!req || !res) return null;
        console.log(req.body);
        const reqBody = UserSignUpReqSchema.safeParse(req.body);

        if(!reqBody.success){
            return res.status(404).json({
                message: "Please Validate Your Input",
            })
        }

        const response = await authService.signupUser(reqBody.data);
        return res.status(response.statusCode).json({
            message: response.statusText,
            data: response.data
        })
    }catch(e){
        console.error("Error in SignUp " + e);
        return res.status(500).json({
            message: "Some thing went wrong",
            data: null
        })
    }   
}

export const signin = async (req:any,res:any)=>{
    try{
        if(!req || !res) return null;
        const reqBody = UserSignInReqSchema.safeParse(req.body);

        if(!reqBody.success){
            return res.status(404).json({
                message: "Please Validate Your Input",
            })
        }

        const response = await authService.signInUser(reqBody.data);

        return res.status(response.statusCode).json({message: response.statusText,data:response.data})
    }catch(e){
        console.error("Error in SignIn " + e);
        return res.status(500).json({
            message: "Some thing went wrong",
            data: null
        })
    } 
}

export const verify = async (req:any,res:any)=>{
    try{
        if(!req || !res) return null;
        const reqBody = req.body;

        if(!reqBody) {
            return res.status(404).json({
                message: "Bad Request",
            })
        }

        const token = reqBody.token;
        if(!token){
            return res.status(404).json({
                message: "Bad Request",
            })
        }

        const response = await authService.verifynUser(token);

        return res.status(response.statusCode).json({
            message: response.statusText,
            data: response.data,
        })
    }catch(e){
        console.error("Error in Verfiy " + e);
        return res.status(500).json({
            message: "Some thing went wrong",
            data: null
        })
    } 
}

// export const logout = async (req,res)=>{
//     try{

//     }catch(e){
//         console.error("Error in Logout " + e);
//         return 
//     } 
// }