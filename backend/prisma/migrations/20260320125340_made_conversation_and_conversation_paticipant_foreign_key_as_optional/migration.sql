-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_last_message_id_fkey";

-- DropForeignKey
ALTER TABLE "ConversationParticipants" DROP CONSTRAINT "ConversationParticipants_conversation_id_fkey";

-- AlterTable
ALTER TABLE "Conversation" ALTER COLUMN "last_message_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ConversationParticipants" ALTER COLUMN "conversation_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_last_message_id_fkey" FOREIGN KEY ("last_message_id") REFERENCES "Messages"("message_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationParticipants" ADD CONSTRAINT "ConversationParticipants_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("conversation_id") ON DELETE SET NULL ON UPDATE CASCADE;
