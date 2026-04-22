import { Router } from "express";

import * as MessageController from './MessageController.js';



const router = Router();

router.get("/conversation/:conversation_id/messages",MessageController.GetAllMessages);
router.post("/conversation/:conversation_id/messages",MessageController.SaveNewMessage);
router.patch("/conversation/:conversation_id/messages/:message_id ",MessageController.UpdateMessageText);
router.delete("/conversation/:conversation_id/messages/:message_id ",MessageController.DeleteMessage);

export default router;
