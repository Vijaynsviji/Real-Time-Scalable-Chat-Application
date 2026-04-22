import { Router } from "express";
import * as ConversationController from './ConversationController.js';

const router = Router();

router.get("/conversations/:userId",ConversationController.GetAllConverationForParticularUser);
router.get("/conversation/:conversation_id",ConversationController.GetConversationBasedOnId);
router.post("/conversation",ConversationController.addConversation);


export default router;