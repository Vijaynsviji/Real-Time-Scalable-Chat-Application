import { afterEach, describe, expect, test, vi } from 'vitest';

import * as ConversationService from '../../Conversation/ConversationService.js';
import { GetReturnMessageObject } from '../../Utils/helperfunctions.js';
import { Status } from '../../Utils/types.js';
import { addConversation, GetAllConverationForParticularUser, GetConversationBasedOnId } from '../../Conversation/ConversationController.js';



describe("Conversation Controller Test", ()=>{

    describe("Get All Conversation of a User Tests", ()=>{

        afterEach(() => {
                vi.clearAllMocks();
        });
        
        test("Valid User, Should Return all Conversation Data",async()=>{
            const userId = "1";
             const req = {
                query: {userId:userId}
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

            const AllConversationList = [{
                    participant_id: "2",
                    created_at: new Date(),
                    user_id: "2",
                    conversation_id: "2"
                }]

            const spy = vi.spyOn(ConversationService,"FetchAllConversationForUser").mockResolvedValue(
                 GetReturnMessageObject(200, Status.Success,AllConversationList,"Fetch All Converation Success.")
            )


            const Acutal = await GetAllConverationForParticularUser(req,res);

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(
                {
                    message: "Fetch All Converation Success.",
                    data: AllConversationList
                }
            )

            expect(spy).toHaveBeenCalledTimes(1);



        })

                
        test("InValid User, Should Return 404 and with valid Response",async()=>{
            const userId = null;
             const req = {
                query: {userId: userId}
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

            const Acutal = await GetAllConverationForParticularUser(req,res);

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith(
                {
                    message: "Please Give Valid User Id.",
                }
            )


        })


    })

    describe("Get Conversation Based on ConversationID Tests", ()=>{

        afterEach(() => {
                vi.clearAllMocks();
        });
        
        test("Valid Conversation ID, Should Return all Conversation Data",async()=>{
            const conversationID = "2";
             const req = {
                query: {conversation_id:conversationID}
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

            const AllConversationList = [{
                    participant_id: "2",
                    created_at: new Date(),
                    user_id: "2",
                    conversation_id: "2"
                }]

            const spy = vi.spyOn(ConversationService,"FetchConversationUsingId").mockResolvedValue(
                 GetReturnMessageObject(200, Status.Success,AllConversationList,"Fetch All Converation Success.")
            )


            const Acutal = await GetConversationBasedOnId(req,res);

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(
                {
                    message: "Fetch All Converation Success.",
                    data: AllConversationList
                }
            )

            expect(spy).toHaveBeenCalledTimes(1);



        })

                
        test("InValid Converation ID, Should Return 404 and with valid Response",async()=>{
            const conversationID = null;
             const req = {
                query: {conversation_id:conversationID}
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

            const Acutal = await GetConversationBasedOnId(req,res);

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith(
                {
                   message: "Please Give Valid conversation Id."
                }
            )


        })


    })


    describe("Save New Conversation Tests", ()=>{
        afterEach(() => {
                vi.clearAllMocks();
        });

        test("With Valid User's Id and No Conversation Present, Should Return 200 with valid Response",async ()=>{
             const UserIdData = {
                user1: "1",
                user2: "2",
             }

            const newConversation = {
                type: "Personal",
                conversation_id: "3",
                user_id1: "1",
                firstParticipant_id: "4",
                user_id2: "2",
                secondParticipant_id: "5",
            }
             const req = {
                body: UserIdData
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

            const spy = vi.spyOn(ConversationService, "addConversation").mockResolvedValue(
                 GetReturnMessageObject(200, Status.Success,newConversation,"New Conversation Created.")
            )

            await addConversation(req,res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "New Conversation Created.",
                data: newConversation
            })



        })


        test("With InValid User's Id , Should Return 404 with valid Response",async ()=>{
             const UserIdData = {
                user1: null,
                user2: "2",
             }

            const newConversation = {
                type: "Personal",
                conversation_id: "3",
                user_id1: "1",
                firstParticipant_id: "4",
                user_id2: "2",
                secondParticipant_id: "5",
            }
             const req = {
                body: UserIdData
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;

           
            await addConversation(req,res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                 message: "Please Give valid User id's to create Conversation."
            })



        })

    })


})