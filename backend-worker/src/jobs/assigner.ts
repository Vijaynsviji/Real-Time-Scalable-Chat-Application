import { DeleteMessageBasedOnConversationIdOrMessageId, SaveConversation, SaveNewMessageBasedOnConversationId, SaveUser, UpdateMessageBasedOnConversationIdAndMessageId } from "./jobs.js";



export const AssignJob = async (job:any)=>{
    try{

        if(!job || !job?.type) return;

        const type = job?.type;
        switch(type){
            case "SaveUser": SaveUser(job?.Data);break;
            case "SaveConversation": SaveConversation(job?.Data);break;
            case "SaveMessage": SaveNewMessageBasedOnConversationId(job?.Data);break;
            case "UpdateMessage": UpdateMessageBasedOnConversationIdAndMessageId(job?.Data);break;
            case "DeleteMessage": DeleteMessageBasedOnConversationIdOrMessageId(job?.Data);break;
            default: return;
        }

    }catch(e){
        console.log("Error in AssignJob "  + e);
    }
}