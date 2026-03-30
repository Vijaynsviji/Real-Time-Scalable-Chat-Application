import { afterEach, describe, expect, test, vi } from 'vitest';

import * as ConversationRepo from '../../Conversation/ConversationRepo.js';
import { Status } from '../../Utils/types.js';
import { GetReturnMessageObject } from '../../Utils/helperfunctions.js';
import { addConversation } from '../../Conversation/ConversationService.js';
import * as UserRepo from "../../User/UserRepo.js";



describe("Conversation Service Tests", ()=>{

    describe("Save New Conversation Tests", ()=>{

        afterEach(() => {
                vi.clearAllMocks();
        });

        test("Valid Two User id should create New Converation, if there is no conversation was present",async ()=>{

            const newConversation = {
            type: "Personal",
            conversation_id: "3",
            user_id1: "1",
            firstParticipant_id: "4",
            user_id2: "2",
            secondParticipant_id: "5",
        }
            const mockFunction = vi.spyOn(UserRepo, "checkValidUserOrNot").mockResolvedValueOnce(true).mockResolvedValueOnce(true);

            const spy = vi.spyOn(ConversationRepo, "getConversationParticipantUsingUserId").mockResolvedValueOnce(
                [{
                    participant_id: "1",
                    created_at: new Date(),
                    user_id: "1",
                    conversation_id: "1"
                }]
            ).mockResolvedValueOnce(
                [{
                    participant_id: "2",
                    created_at: new Date(),
                    user_id: "2",
                    conversation_id: "2"
                }]
            )

            const spyRepo = vi.spyOn(ConversationRepo,"SaveConversation").mockResolvedValue(newConversation);

            

            const Expected = GetReturnMessageObject(200, Status.Success,newConversation,"New Conversation Created.");

            const Actual = await addConversation("1","2");

            expect(Actual).toStrictEqual(Expected);
            expect(spyRepo).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledTimes(2);


        })

        test("Valid Two User id, But Already there is a Conversation, Should return 404 with valid Response", async()=>{
            const mockFunction = vi.spyOn(UserRepo, "checkValidUserOrNot").mockResolvedValueOnce(true).mockResolvedValueOnce(true);

            const spy = vi.spyOn(ConversationRepo, "getConversationParticipantUsingUserId").mockResolvedValueOnce(
                [{
                    participant_id: "1",
                    created_at: new Date(),
                    user_id: "1",
                    conversation_id: "1"
                }]
            ).mockResolvedValueOnce(
                [{
                    participant_id: "2",
                    created_at: new Date(),
                    user_id: "2",
                    conversation_id: "1"
                }]
            )

            const Expected = GetReturnMessageObject(404, Status.Error,null,"Already have an Conversation Record.");

            const Actual = await addConversation("1","2");

            expect(Actual).toStrictEqual(Expected);
            expect(spy).toHaveBeenCalledTimes(2);
        })

        test("In Valid User Id, Should Return 404 with valid Response", async()=>{
            const mockFunction = vi.spyOn(UserRepo, "checkValidUserOrNot").mockResolvedValueOnce(true).mockResolvedValueOnce(false);

            const Expected = GetReturnMessageObject(404, Status.Error,null,"Given User Id's Are not Valid.");

            const Actual = await addConversation("1", "2");

            expect(Actual).toStrictEqual(Expected);

            expect(mockFunction).toHaveBeenCalledTimes(2)
        })

    })
})