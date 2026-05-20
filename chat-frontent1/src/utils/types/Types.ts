



export type Status = "sent" | "delivered" | "read"


export type Message = {
    message_id:  string | null,
    cipher_key:  String | null,
    message_encrypt: string,
    sender_id?: string,
    conversation_id?: string,
    created_at: Date | string,
    status : Status
}