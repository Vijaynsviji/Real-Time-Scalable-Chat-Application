import React from 'react'
import MessageViewHeader from './messageviewheader'
import MessageComp from './messagecomp';
import MessageInput from './messageinput';
import type { Message } from '../../../utils/types/Types';
import { messageData } from './messagedata';
import type { Contact } from '../sidebar/contactlist';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from "uuid";


interface MessageView{
  messages: Message[],
  socketObject?: WebSocket | null,
  selectedContact?: Contact | null,
  handleAddNewMessage: (newMessage:Message)=>void,
}



function MessageView({handleAddNewMessage,selectedContact,messages,socketObject}:MessageView) {
    const currentUser = useSelector((state:any) => state?.user?.currentUser);
  // const dispatch = useDispatch();


  const sendMessage = (messageText:string)=>{
    try{

      if(!messageText) return;

      if(!socketObject || !selectedContact) return;

      const messageObject:Message = {
        message_id:  uuidv4(),
        cipher_key: "",
        message_encrypt: messageText,
        status: "sent",
        created_at: new Date(),
        sender_id: currentUser?.user_id || currentUser?.data?.user_id,
        conversation_id: selectedContact?.conversation_id || ""
      };
      
      socketObject.send(JSON.stringify({...messageObject,user_email: selectedContact?.email}));

      handleAddNewMessage(messageObject);

    }catch(e){
      console.error("Error in sendMessage " + e);
    }
  }


  return (
    <>
        <MessageViewHeader selectedContact={selectedContact} />
        <MessageComp messageData={messages}/>
        <MessageInput sendMessage={sendMessage} />
    </>
  )
}

export default MessageView;