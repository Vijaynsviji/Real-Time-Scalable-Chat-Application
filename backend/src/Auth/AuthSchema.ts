
import { z } from "zod";
export const UserSignUpReqSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.email(),
    password: z.string().min(8).max(16)
});


export const UserSignInReqSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(16)
});

