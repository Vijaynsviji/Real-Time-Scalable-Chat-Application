

import React from 'react'
import ContactCard from './contactcard'
import { staticContactData } from './sidebardata';
import type { Message, Status } from '../../../utils/types/Types';





export interface Contact{
    id:string | number | null,
  isOnline: boolean,
  email:string | null,
  Name: string,
  conversation_id?: string | null,
  messages?: Message[] | null,
  public_key?: string | null
}


export interface ContactCardProp extends Contact{
  unReadMessageCount?: number,
  lastMessage?: Message,
  lastMessageDate?: Date
}


interface ContactList{
  allUserConverations: ContactCardProp[],
  selectedContact:Contact | null,
  handleChangeSelectedContact: (contact: Contact)=>void
}

function ContactList({allUserConverations,handleChangeSelectedContact,selectedContact}:ContactList) {
  const allConversationArray = Object.values(allUserConverations);

  return (
    <div className='overflow-y-scroll h-[100%]'>
      <div className='flex flex-col'>
        {allConversationArray && allConversationArray?.map(item=>{
          return <ContactCard public_key={item?.public_key} conversation_id={item?.conversation_id} email={item?.email} key={item?.id} id={item?.id || null} messages={item?.messages} onClickContact={handleChangeSelectedContact}  isOnline={item?.isOnline} Name={item?.Name} unReadMessageCount={item?.unReadMessageCount} lastMessage={item?.lastMessage} lastMessageDate={item?.lastMessageDate} isSelected={selectedContact?.email==item?.email}/>
        })}
      </div>
      
    </div>
  )
}

export default ContactList