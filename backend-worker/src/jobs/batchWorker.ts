// import { inMemoryBatches } from "../types.js";
// import pg, { ClientBase, PoolClient } from 'pg';
// // @ts-ignore
// import pgEssential from "pg-essential";

// pgEssential.patch(pg);

// let Connection: ClientBase | null = null;


// async function connectedToPostgresClient(){
//     try{
//         const pool = new pg.Client({
//         user: "postgres",
//         host: "localhost",
//         database: "chatdatabase",
//         password: "newpassword",
//         port: 5431,
//         });

//         if(!pool) return;

//         const connection = pool.e;
    
//     }catch(e){
//         console.error("Error in connectedToPostgresClient " + e);
//     }
// }



// //creating the in Memory Batch Array's for Flush
// const inMemoryBatches:inMemoryBatches = {
//     userBatchRequests: [],
//     conversationBatchRequests: {
//         conversationBatch: [],
//         firstParticipantBatch: [],
//         secondParticipantBatch: [],
//     }, 
//     saveMessageBatchRequests: [],
//     updateMessageOnConversationIdBatchRequests: [],
//     updateConversationLastMessage: [],
//     deleteMessageOnConversationIdBatchRequests: [],
// }

// const BatchSizeLimit = 500;


// const addBatchRequestBasedOnKey = (key:string,data:any)=>{
//     try{

//         if(!key || !data) return false;

//         if(key=="saveUser"){
//             const user = {
//                 user_id: data?.user_id,
//                 first_name: data?.first_name,
//                 last_name: data?.last_name,
//                 email: data?.email,
//                 password:  data?.password
//             }
            
//             inMemoryBatches.userBatchRequests.push(user);
//             if(inMemoryBatches.userBatchRequests.length>=BatchSizeLimit){
//                 //flush batch Requests

//             }

//         }else if(key=="saveConversation"){

//             const conversationBatch = {
//                 type: data?.type,
//                 conversation_id: data?.conversation_id
//             }

//             const firstParticipant = {
//                 participant_id: data?.firstParticipant_id,
//                 user_id: data?.user_id1,
//                 conversation_id: data?.conversation_id
//             }

//             const secondParticipant = {
//                 participant_id: data?.secondParticipant_id,
//                 user_id: data?.user_id2,
//                 conversation_id: data?.conversation_id
//             }

//             inMemoryBatches.conversationBatchRequests.
//             conversationBatch.push(conversationBatch);

//             inMemoryBatches.conversationBatchRequests.
//             firstParticipantBatch.push(firstParticipant);

//             inMemoryBatches.conversationBatchRequests.
//             secondParticipantBatch.push(secondParticipant);

//             if(inMemoryBatches.conversationBatchRequests.conversationBatch.length>=BatchSizeLimit){
//                 //flush batch Requests

//             }
            


//         }else if(key=="saveMessages"){

//             const newMessage = {
//                 message_id: data?.message_id,
//                 cipher_key: data?.cipher_key,
//                 message_encrypt: data?.message_encrypt,
//                 status: data?.status,
//                 sender_id: data?.sender_id,
//                 conversation_id: data?.conversation_id,
//                 created_at: new Date(data?.created_at)
//             }

//             const UpatedConversation = {
//                 conversation_id: data?.conversation_id,
//                 last_message_id: data?.message_id
//             }

//             if(inMemoryBatches.saveMessageBatchRequests.length>BatchSizeLimit){
//                 //flush batch Requests

//             }

//         }else if(key=="updateMessage"){

//             const updatedMessage = {
//                 message_id:data?.message_id, 
//                 cipher_key: data?.cipher_key,
//                 message_encrypt: data?. message_encrypt
//             }

//             inMemoryBatches.updateMessageOnConversationIdBatchRequests.push(updatedMessage);

//             if(inMemoryBatches.updateConversationLastMessage.length>=BatchSizeLimit){
//                 //flush batch Requests

//             }


//         }else if(key=="deleteMessage"){

//             inMemoryBatches.deleteMessageOnConversationIdBatchRequests.push(data?.message_id);

//             if(inMemoryBatches.deleteMessageOnConversationIdBatchRequests.length>=BatchSizeLimit){
//                 //flush batch Requests

//             }

//         }

//     }catch(e){
//         console.error("Error in addBatchRequestBasedOnKey " + e);
//         return false;
//     }
// }


// const flushNewUserCreated = async ()=>{
//     try{

//         if(!inMemoryBatches?.userBatchRequests || !Connection) return false;

//         const userColumns = ['user_id','first_name','last_name','email','password'];

//         await Connection.


//     }catch(e){
//         console.error("Error in flushNewUserCreated " + e);
//         return false;
//     }
// }