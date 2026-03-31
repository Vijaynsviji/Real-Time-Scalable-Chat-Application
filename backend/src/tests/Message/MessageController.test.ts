import { afterEach, describe, expect, test, vi } from 'vitest';

import * as MessageService from '../../Message/MessageService.js'
import { GetReturnMessageObject } from '../../Utils/helperfunctions.js';
import { Status } from '../../Utils/types.js';
import { DeleteMessage, GetAllMessages, SaveNewMessage, UpdateMessageText } from '../../Message/MessageController.js';

describe("Message Controller Tests", ()=>{
    

    describe("Get All Messages based on Conversation Id", ()=>{


        afterEach(() => {
                vi.clearAllMocks();
        });

        test("Valid Conversation Id Should Fetch all Message, with Status 200", async ()=>{
             const conversation_id = "1";
             const req = {
                query: {conversation_id:conversation_id}
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

            const AllMessages = [{
                    cipher_key: "cipher text",
                    message_encrypt: "encrypt",
                    status: "Read",
                    sender_id: "1",
                    message_id: "1",
                    created_at: new Date(),
                    conversation_id: "1",
            }]



            const spy = vi.spyOn(MessageService, "FetchAllMessagesForConversationId").mockResolvedValue(
                GetReturnMessageObject(200, Status.Success,AllMessages,"Message Fetch Succes.")
            )


            await GetAllMessages(req,res);

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({
                message: "Message Fetch Succes.",
                data: AllMessages,
            }
                
            )


        })

        test("InValid Conversation Id Should return with Status 404 and with valid response", async ()=>{
             const conversation_id = null;
             const req = {
                query: {conversation_id:conversation_id}
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

          
            await GetAllMessages(req,res);

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({
                message: "Please Give Valid Conversation Id."
            }
                
            )


        })

    })

    describe("Save New Message Tests",()=>{


        afterEach(()=>{
            vi.clearAllMocks();
        })

        test("with Valid Conversation Id, Should add New Message and return Status 200",async ()=>{
            const conversation_id = "1";
             const req = {
                query: {conversation_id:conversation_id},
                body: {
                    cipher_key: "cipher text",
                    message_encrypt: "encrypt",
                    status: "read",
                    sender_id: "1",
                }
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

            const newMessage = {
                    cipher_key: "cipher text",
                    message_encrypt: "encrypt",
                    status: "Read",
                    sender_id: "1",
                    message_id: "1",
                    created_at: new Date(),
                    conversation_id: "1",
            }


            const spy = vi.spyOn(MessageService, "SaveNewMessageForConversationId").mockResolvedValue(
                GetReturnMessageObject(200, Status.Success,newMessage,"Message Saved Succes.")
            )


            await SaveNewMessage(req,res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Message Saved Succes.",
                data: newMessage
            })

        })

        test("with InValid Conversation Id, Should return 404 with valid response",async ()=>{
            const conversation_id = null;
             const req = {
                query: {conversation_id:conversation_id},
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

           

            await SaveNewMessage(req,res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Please Give Valid Conversation Id."
            })

        })

        test("with valid Conversation Id but the message object is not valid, Should return 404 with valid response",async ()=>{
            const conversation_id = "1";
             const req = {
                query: {conversation_id:conversation_id},
                 body: {
                    cipher_key: "cipher text",
                    message_encrypt: "encrypt",
                    status: "read",
                }
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

           

            await SaveNewMessage(req,res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Please Validate Your Input",
            })

        })
    })


    describe("Update Message Text Tests", ()=>{

        
        afterEach(()=>{
            vi.clearAllMocks();
        })

        test("With Valid Conversation Id and Message Id and With Other valid Input, Should Update the Message and return 200", async ()=>{

            const conversation_id = "1";
            const message_id = "1";
             const req = {
                query: {conversation_id:conversation_id,message_id:message_id},
                body: {
                    cipher_key: "cipher text",
                    message_encrypt: "encrypt",
                }
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

            const updatedMessage = {
                message_id: "1",
                cipher_key: "cipher text",
                message_encrypt:  "encrypt"
            }

            const spy = vi.spyOn(MessageService,"UpdateMessageTextBasedOnMessageId").mockResolvedValue(
                GetReturnMessageObject(200, Status.Success,updatedMessage,"Message Update Succes.")
            )


            await UpdateMessageText(req,res);


            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Message Update Succes.",
                data: updatedMessage
            })
            expect(spy).toHaveBeenCalledTimes(1);



        })

        test("With InValid Conversation Id, Should return 404 with valid Response", async ()=>{

            const conversation_id = null;
            const message_id = "1";
             const req = {
                query: {conversation_id:conversation_id,message_id:message_id},
                body: {
                    cipher_key: "cipher text",
                    message_encrypt: "encrypt",
                }
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

            const updatedMessage = {
                message_id: "1",
                cipher_key: "cipher text",
                message_encrypt:  "encrypt"
            }

            const spy = vi.spyOn(MessageService,"UpdateMessageTextBasedOnMessageId").mockResolvedValue(
                GetReturnMessageObject(200, Status.Success,updatedMessage,"Message Update Succes.")
            )


            await UpdateMessageText(req,res);


            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Please Give Valid Conversation Id."
            })
            expect(spy).toHaveBeenCalledTimes(0);



        })

        test("With InValid Message Id, Should return 404 with valid Response", async ()=>{

            const conversation_id = "1";
            const message_id = null;
             const req = {
                query: {conversation_id:conversation_id,message_id:message_id},
                body: {
                    cipher_key: "cipher text",
                    message_encrypt: "encrypt",
                }
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

            const updatedMessage = {
                message_id: "1",
                cipher_key: "cipher text",
                message_encrypt:  "encrypt"
            }

            const spy = vi.spyOn(MessageService,"UpdateMessageTextBasedOnMessageId").mockResolvedValue(
                GetReturnMessageObject(200, Status.Success,updatedMessage,"Message Update Succes.")
            )


            await UpdateMessageText(req,res);


            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Please Give Valid Message Id."
            })
            expect(spy).toHaveBeenCalledTimes(0);



        })

        test("With InValid  cipher_key Data, Should return 404 with valid Response", async ()=>{

            const conversation_id = "1";
            const message_id = "2";
             const req = {
                query: {conversation_id:conversation_id,message_id:message_id},
                body: {
                    cipher_key: null,
                    message_encrypt: "encrypt",
                }
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

            const updatedMessage = {
                message_id: "1",
                cipher_key: "cipher text",
                message_encrypt:  "encrypt"
            }

            const spy = vi.spyOn(MessageService,"UpdateMessageTextBasedOnMessageId").mockResolvedValue(
                GetReturnMessageObject(200, Status.Success,updatedMessage,"Message Update Succes.")
            )


            await UpdateMessageText(req,res);


            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Please provide cipher_key Id."
            })
            expect(spy).toHaveBeenCalledTimes(0);



        })

        test("With InValid message_encrypt Data, Should return 404 with valid Response", async ()=>{

            const conversation_id = "1";
            const message_id = "2";
             const req = {
                query: {conversation_id:conversation_id,message_id:message_id},
                body: {
                    cipher_key: "Some Value",
                    message_encrypt: null,
                }
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

            const updatedMessage = {
                message_id: "1",
                cipher_key: "cipher text",
                message_encrypt:  "encrypt"
            }

            const spy = vi.spyOn(MessageService,"UpdateMessageTextBasedOnMessageId").mockResolvedValue(
                GetReturnMessageObject(200, Status.Success,updatedMessage,"Message Update Succes.")
            )


            await UpdateMessageText(req,res);


            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Please provide message_encrypt."
            })
            expect(spy).toHaveBeenCalledTimes(0);



        })



    })


    describe("Delete Message Text Tests", ()=>{

        
        afterEach(()=>{
            vi.clearAllMocks();
        })

        test("With Valid Conversation Id and Message Id and With Other valid Input, Should Delete the Message and return 200", async ()=>{

            const conversation_id = "1";
            const message_id = "1";
             const req = {
                query: {conversation_id:conversation_id,message_id:message_id},
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

            const deletedMessage = {
                message_id: "1",
            }

            const spy = vi.spyOn(MessageService,"DeleteMessage").mockResolvedValue(
                GetReturnMessageObject(200, Status.Success,deletedMessage,"Message Delete Succes.")
            )


            await DeleteMessage(req,res);


            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Message Delete Succes.",
                data: deletedMessage
            })
            expect(spy).toHaveBeenCalledTimes(1);



        })

        test("With InValid Conversation Id, Should return 404 with valid Response", async ()=>{

            const conversation_id = null;
            const message_id = "1";
             const req = {
                query: {conversation_id:conversation_id,message_id:message_id},
                body: {
                    cipher_key: "cipher text",
                    message_encrypt: "encrypt",
                }
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

            const updatedMessage = {
                message_id: "1",
            }

            const spy = vi.spyOn(MessageService,"UpdateMessageTextBasedOnMessageId").mockResolvedValue(
                GetReturnMessageObject(200, Status.Success,updatedMessage,"Message Update Succes.")
            )


            await DeleteMessage(req,res);


            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Please Give Valid Conversation Id."
            })
            expect(spy).toHaveBeenCalledTimes(0);



        })

        test("With InValid Message Id, Should return 404 with valid Response", async ()=>{

            const conversation_id = "1";
            const message_id = null;
             const req = {
                query: {conversation_id:conversation_id,message_id:message_id},
                body: {
                    cipher_key: "cipher text",
                    message_encrypt: "encrypt",
                }
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

            const updatedMessage = {
                message_id: "1",
            }

            const spy = vi.spyOn(MessageService,"UpdateMessageTextBasedOnMessageId").mockResolvedValue(
                GetReturnMessageObject(200, Status.Success,updatedMessage,"Message Update Succes.")
            )


            await DeleteMessage(req,res);


            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Please Give Valid Message Id."
            })
            expect(spy).toHaveBeenCalledTimes(0);



        })


    })
    


})