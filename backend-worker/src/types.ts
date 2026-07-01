
interface conversationBatchRequests{
    conversationBatch: any[],
    firstParticipantBatch: any[],
    secondParticipantBatch: any[],
}




export interface inMemoryBatches{
     userBatchRequests: any[],
    conversationBatchRequests: conversationBatchRequests,
    saveMessageBatchRequests: any[],
    updateMessageOnConversationIdBatchRequests: any[],
    updateConversationLastMessage: any[],
    deleteMessageOnConversationIdBatchRequests: any[],
}