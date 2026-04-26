



export interface webSocketMessage{
    user_email: string,
    message: string,
     message_id?: string,
    cipher_key?: string,
    message_encrypt: string,
    status: string,
    sender_id: string,
    conversation_id: string
}