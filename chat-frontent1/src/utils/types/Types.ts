



export type Status = "sent" | "delivered" | "read"


export type Message = {
    message_id: Number | String | null,
    cipher_key:  String | null,
    message_encrypt: string,
    sender_id?: string,
    conversation_id?: string,
    created_at: Date,
    status : Status
}