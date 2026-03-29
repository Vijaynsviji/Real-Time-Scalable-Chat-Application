
import { MessageBodySchema } from './MessageSchema.js';
import * as MessageService from './MessageService.js';

export const GetAllMessages = async (req:any, res:any)=>{
    try{
        if(!req || !res) return null;
        const conversation_id = req?.query?.conversation_id;

        if(!conversation_id){
            return res.status(404).json({
                message: "Please Give Valid Conversation Id."
            });
        }

        const AllMessagesList = await MessageService.FetchAllMessagesForConversationId(conversation_id);

        return res.status(AllMessagesList?.statusCode).json({
            message: AllMessagesList?.statusText,
            data: AllMessagesList?.data
        })

    }catch(e){
        console.error("Error in GetAllMessages " + e);
        return res.status(500).json({
            message: "Some thing went wrong",
            data: null
        })
    }
}



export const SaveNewMessage = async (req:any, res:any)=>{
    try{
        if(!req || !res) return null;
        const conversation_id = req?.query?.conversation_id;

        if(!conversation_id){
            return res.status(404).json({
                message: "Please Give Valid Conversation Id."
            });
        }

        const MessageData = MessageBodySchema.safeParse(req.body);

        if(!MessageData.success){
            return res.status(404).json({
                message: "Please Validate Your Input",
            })
        }

        



        const AllMessagesList = await MessageService.SaveNewMessageForConversationId(conversation_id,MessageData?.data);

        return res.status(AllMessagesList?.statusCode).json({
            message: AllMessagesList?.statusText,
            data: AllMessagesList?.data
        })

    }catch(e){
        console.error("Error in GetAllMessages " + e);
        return res.status(500).json({
            message: "Some thing went wrong",
            data: null
        })
    }
}


export const UpdateMessageText = async (req:any, res:any)=>{
    try{
        if(!req || !res) return null;
        const conversation_id = req?.query?.conversation_id;

        if(!conversation_id){
            return res.status(404).json({
                message: "Please Give Valid Conversation Id."
            });
        }


        const message_id = req?.query?.message_id;

        if(!message_id){
            return res.status(404).json({
                message: "Please Give Valid Message Id."
            });
        }

        const {message_encrypt,cipher_key} = req.body;

        if(!message_encrypt){
            return res.status(404).json({
                message: "Please provide message_encrypt."
            });
        }

        if(!cipher_key){
            return res.status(404).json({
                message: "Please provide cipher_key Id."
            });
        }

        const UpdatedMessageResponse = await MessageService.UpdateMessageTextBasedOnMessageId(conversation_id,message_id,cipher_key,message_encrypt);

        return res.status(UpdatedMessageResponse?.statusCode).json({
            message: UpdatedMessageResponse?.statusText,
            data: UpdatedMessageResponse?.data
        })

    }catch(e){
        console.error("Error in GetAllMessages " + e);
        return res.status(500).json({
            message: "Some thing went wrong",
            data: null
        })
    }
}


export const DeleteMessage = async (req:any, res:any)=>{
    try{
        if(!req || !res) return null;
        const conversation_id = req?.query?.conversation_id;

        if(!conversation_id){
            return res.status(404).json({
                message: "Please Give Valid Conversation Id."
            });
        }


        const message_id = req?.query?.message_id;

        if(!message_id){
            return res.status(404).json({
                message: "Please Give Valid Message Id."
            });
        }

        const UpdatedMessageResponse = await MessageService.DeleteMessage(conversation_id,message_id);

        return res.status(UpdatedMessageResponse?.statusCode).json({
            message: UpdatedMessageResponse?.statusText,
            data: UpdatedMessageResponse?.data
        })

    }catch(e){
        console.error("Error in GetAllMessages " + e);
        return res.status(500).json({
            message: "Some thing went wrong",
            data: null
        })
    }
}
