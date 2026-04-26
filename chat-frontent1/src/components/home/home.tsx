import React from "react";
import useVerifyUser from "../hooks/useVerifyUser";
import MessageView from "./messageview/messageview";
import SideBar from "./sidebar/sidebar";
import type { Message } from "../../utils/types/Types";
import { safeJSONParse } from "../../utils/HelperFunctions";
import type { Contact } from "./sidebar/contactlist";
import { messageData } from "./messageview/messagedata";
import axios from "axios";
import { apiBaseUrl } from "../../config/api";
import { useDispatch, useSelector } from "react-redux";
import { setConversationMessages } from "../../store/slicers/conversation";


export default function Home(){
    const {socketObject} = useVerifyUser();
    const [selectedContact,setSelectedContact] = React.useState<Contact | null>(null);
    const [messages,setMessages] = React.useState<Message[]>([]);
     const currentUserDetails = useSelector((state:any)=> state?.user?.currentUser);
     const dispatch = useDispatch();


    const handleChangeSelectedContact = async (contact:Contact | null)=>{
        try{
            if(contact==null || contact==undefined) return;
            setMessages(contact?.messages || []);
            setSelectedContact(contact);
    
            if(!contact?.conversation_id){
                const response = await axios.post( apiBaseUrl + "/conversation", {
                    user1: currentUserDetails?.user_id || currentUserDetails?.data?.user_id,
                    user2: contact?.id
                })

                if(response?.status){
                    const data = response?.data;
                    const conversation_id = data?.conversation_id;
                    if(!conversation_id) return;
                    setSelectedContact((prev)=>{
                        if(!prev) return prev;
                        return {...prev, conversation_id: conversation_id}
                    })
                }
            }
        }catch(e){
            console.error("Error in handleChangeSelectedContact " + e);
        }
    }

    React.useEffect(()=>{
        if(socketObject){
            socketObject.onmessage = (e)=>{
                const data = e?.data;
                const parsedData = safeJSONParse<any>(data,{});
                const MessageData = parsedData;

                const messageObject:Message = {
                    message_id:  MessageData?.message_id,
                    cipher_key: MessageData?.cipher_key,
                    message_encrypt: MessageData?.message_encrypt,
                    status: MessageData?.status,
                    created_at: MessageData?.created_at,
                    sender_id: MessageData?.sender_id,
                    conversation_id: MessageData?.conversation_id
                };

                const payload = {
                    conversation_id: messageObject?.conversation_id,
                    message: messageObject
                }

                 if(selectedContact?.conversation_id == MessageData?.conversation_id){
                    setMessages(prev=>[...prev,MessageData]);
                }

                dispatch(setConversationMessages(payload));
        
            };
        }

        return ()=>{
            socketObject?.close();
        }
    },[socketObject])


    const handleAddNewMessage = (newMessage:Message)=>{
        setMessages(prev=>[...prev,newMessage]);
        const payload = {
            conversation_id: newMessage?.conversation_id,
            message: newMessage
        }

        dispatch(setConversationMessages(payload));
    }




    return <div className="bg-[var(--light-color-100)] box-border">
        <div className="border-[2px] box-border border-solid border-[var(--border)] h-[calc(100vh-40px)] m-[20px] rounded-[20px] grid grid-cols-[1fr] md:grid-cols-[1fr_2fr]">
            <div className="box-border hidden md:flex flex-col overflow-hidden border-r-[2px] border-[var(--border)]"><SideBar selectedContact={selectedContact} handleChangeSelectedContact={handleChangeSelectedContact} /></div>
            <div className="box-border hidden md:flex flex-col  overflow-y-hidden"><MessageView handleAddNewMessage={handleAddNewMessage} selectedContact={selectedContact}  socketObject={socketObject} messages={messages} /></div>


            {!selectedContact && <div className="box-border flex md:hidden flex-col overflow-hidden border-r-[2px] border-[var(--border)]"><SideBar selectedContact={selectedContact} handleChangeSelectedContact={handleChangeSelectedContact} /></div>}
            {selectedContact && <div className="box-border md:hidden flex flex-col  overflow-y-hidden"><MessageView handleAddNewMessage={handleAddNewMessage} selectedContact={selectedContact}  socketObject={socketObject} messages={messages} /></div>}

        </div>
    </div>
}