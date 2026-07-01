import React from 'react'
import MessageViewHeader from './messageviewheader'
import MessageComp from './messagecomp';
import MessageInput from './messageinput';
import type { Message } from '../../../utils/types/Types';
import { messageData } from './messagedata';
import type { Contact } from '../sidebar/contactlist';
import { useSelector } from 'react-redux';
import { v7  } from "uuid";
import { Base64StringToCryptoKey, encryptSymmetricKeyWithPublicKey, generateSymmetricKeyAndEncryptMessage } from '../../../utils/HelperFunctions';


interface MessageView{
  messages: Message[],
  socketObject?: WebSocket | null,
  selectedContact?: Contact | null,
  handleAddNewMessage: (newMessage:Message)=>void,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}



function MessageView({handleAddNewMessage,selectedContact,messages,socketObject,setMessages}:MessageView) {
    const currentUser = useSelector((state:any) => state?.user?.currentUser);
  // const dispatch = useDispatch();


  const sendMessage = async (messageText:string)=>{
    try{

      if(!messageText) return;

      if(!socketObject || !selectedContact) return;

      const EncryptedData = await generateSymmetricKeyAndEncryptMessage(messageText);

      if(!EncryptedData){
        throw("Unable to Encrypt Message Text");
      }

      const publicKeyOfCurrentSelectedUser = await Base64StringToCryptoKey(selectedContact?.public_key || "");
      const publicKeyOfCurrentUser = await Base64StringToCryptoKey(currentUser?.public_key);
      if(!publicKeyOfCurrentSelectedUser || !publicKeyOfCurrentUser){
        throw("Unable to Convert Public key String to Public Crypto Key");
      }
      const EncrtyptSymmetricKey = await encryptSymmetricKeyWithPublicKey(EncryptedData?.encryptKey,publicKeyOfCurrentSelectedUser);
      const EncryptedSymmetricKeyOfSender = await encryptSymmetricKeyWithPublicKey(EncryptedData?.encryptKey,publicKeyOfCurrentUser);
      const {privateKey,...currentUserDetailsExceptPrivateKey} = currentUser

      const messageObject:Message = {
        message_id:  v7(),
        cipher_key: EncrtyptSymmetricKey,
        sender_cipher_key: EncryptedSymmetricKeyOfSender,
        message_encrypt: EncryptedData?.encryptedMessage,
        status: "sent",
        created_at: new Date().toISOString(),
        sender_id: currentUser?.user_id || currentUser?.data?.user_id,
        conversation_id: selectedContact?.conversation_id || "",
        currentUserDetails: currentUserDetailsExceptPrivateKey
      };
      
      socketObject.send(JSON.stringify({...messageObject,user_email: selectedContact?.email}));

      handleAddNewMessage({...messageObject,message_encrypt:messageText});

    }catch(e){
      console.error("Error in sendMessage " + e);
    }
  }


  return (
    <>
        <MessageViewHeader selectedContact={selectedContact} />
        <MessageComp messageData={messages} setMessages={setMessages}/>
        <MessageInput sendMessage={sendMessage} />
    </>
  )
}

export default MessageView;