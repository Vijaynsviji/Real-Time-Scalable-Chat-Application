
import { z } from "zod";
export const UserSignUpReqSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.email(),
    password: z.string().min(8).max(16),
    public_key: z.string().optional()
});


export const UserSignInReqSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(16)
});

