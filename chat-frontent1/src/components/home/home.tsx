import React from "react";
import useVerifyUser from "../hooks/useVerifyUser";
import MessageView from "./messageview/messageview";
import SideBar from "./sidebar/sidebar";
import type { Message } from "../../utils/types/Types";
import { safeJSONParse } from "../../utils/HelperFunctions";
import type { Contact } from "./sidebar/contactlist";
import { messageData } from "./messageview/messagedata";


export default function Home(){
    const {socketObject} = useVerifyUser();
    const [selectedContact,setSelectedContact] = React.useState<Contact | null>(null);
    const [messages,setMessages] = React.useState<Message[]>([]);


    const handleChangeSelectedContact = (contact:Contact | null)=>{
        if(contact==null || contact==undefined) return;
        setSelectedContact(contact);
    }

    React.useEffect(()=>{
        if(socketObject){
            socketObject.onmessage = (e)=>{
                const data = e?.data;
                const parsedData = safeJSONParse<any>(data,{});
                const MessageData = parsedData?.message;
                
                setMessages(prev=>[...prev,MessageData]);
        
            };
        }

        return ()=>{
            socketObject?.close();
        }
    },[socketObject])


    const handleAddNewMessage = (newMessage:Message)=>{
        setMessages(prev=>[...prev,newMessage]);
    }




    return <div className="bg-[var(--light-color-100)] box-border">
        <div className="border-[2px] box-border border-solid border-[var(--border)] h-[calc(100vh-40px)] m-[20px] rounded-[20px] grid grid-cols-[1fr] md:grid-cols-[1fr_2fr]">
            <div className="box-border hidden md:flex flex-col overflow-hidden border-r-[2px] border-[var(--border)]"><SideBar selectedContact={selectedContact} handleChangeSelectedContact={handleChangeSelectedContact} /></div>
            <div className="box-border hidden md:flex flex-col  overflow-y-hidden"><MessageView handleAddNewMessage={handleAddNewMessage} selectedContact={selectedContact}  socketObject={socketObject} messages={messageData} /></div>


            {!selectedContact && <div className="box-border flex md:hidden flex-col overflow-hidden border-r-[2px] border-[var(--border)]"><SideBar selectedContact={selectedContact} handleChangeSelectedContact={handleChangeSelectedContact} /></div>}
            {selectedContact && <div className="box-border md:hidden flex flex-col  overflow-y-hidden"><MessageView handleAddNewMessage={handleAddNewMessage} selectedContact={selectedContact}  socketObject={socketObject} messages={messageData} /></div>}

        </div>
    </div>
}