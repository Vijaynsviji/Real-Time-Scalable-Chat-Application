import React from 'react'
import MessageViewHeader from './messageviewheader'
import MessageComp from './messagecomp';
import MessageInput from './messageinput';
import type { Message } from '../../../utils/types/Types';
import { messageData } from './messagedata';
import type { Contact } from '../sidebar/contactlist';
import { useSelector } from 'react-redux';


interface MessageView{
  messages: Message[],
  socketObject?: WebSocket | null,
  selectedContact?: Contact | null,
  handleAddNewMessage: (newMessage:Message)=>void,
}



function MessageView({handleAddNewMessage,selectedContact,messages,socketObject}:MessageView) {
    const currentUser = useSelector((state:any) => state?.user?.currentUser);
  // const dispatch = useDispatch();


  const sendMessage = (newMessage:Message)=>{
    try{

      if(!newMessage) return;
      const OriginalMessage = {...newMessage};

      if(!socketObject || !selectedContact) return;

      newMessage.person = currentUser?.Name;
      newMessage.date = new Date();
      newMessage.id = selectedContact.email;

      const messageObject = {
        user_email: selectedContact?.email,
        message: newMessage,
      };
      socketObject.send(JSON.stringify(messageObject));

      handleAddNewMessage(OriginalMessage);

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