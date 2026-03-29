


import {z} from 'zod';


export const MessageBodySchema = z.object({
    cipher_key: z.string(), 
    message_encrypt: z.string(),
    status: z.string(),
    sender_id:  z.string(),
})