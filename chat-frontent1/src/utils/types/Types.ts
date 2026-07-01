import type { CurrentUser } from "../../store/slicers/users"




export type Status = "sent" | "delivered" | "read"


export type Message = {
    message_id:  string | null,
    cipher_key:  string | null,
    message_encrypt: string,
    sender_id?: string,
    conversation_id?: string,
    created_at: Date | string,
    status : Status,
    currentUserDetails? : CurrentUser,
    sender_cipher_key?: string | null,
}