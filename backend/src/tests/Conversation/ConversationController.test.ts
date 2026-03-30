import { afterEach, describe, expect, test, vi } from 'vitest';

import * as ConversationService from '../../Conversation/ConversationService.js';
import { GetReturnMessageObject } from '../../Utils/helperfunctions.js';
import { Status } from '../../Utils/types.js';
import { GetAllConverationForParticularUser } from '../../Conversation/ConversationController.js';



describe("Conversation Controller Test", ()=>{

    describe("Get All Conversation of a User Tests", ()=>{

        afterEach(() => {
                vi.clearAllMocks();
        });
        
        test("Valid User, Should Return all Conversation Data",async()=>{
            const userId = "1";
             const req = {
                query: userId
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
            const userId = "1";
             const req = {
                query: {userId: userId}
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
    })
})