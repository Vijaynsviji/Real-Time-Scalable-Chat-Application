

import React from 'react'
import ContactCard from './contactcard'
import { staticContactData } from './sidebardata';
import type { Status } from '../../../utils/types/Types';





export interface Contact{
    id:string | number | null,
  isOnline: boolean,
  email:string | null,
  Name: string,
  conversation_id?: string | null
}


export interface ContactCardProp extends Contact{
  unReadMessageCount?: number,
  lastMessage?: string,
  lastMessageDate?: Date
}


interface ContactList{
  allUserConverations: ContactCardProp[],
  selectedContact:Contact | null,
  handleChangeSelectedContact: (contact: Contact)=>void
}

function ContactList({allUserConverations,handleChangeSelectedContact,selectedContact}:ContactList) {


  return (
    <div className='overflow-y-scroll h-[100%]'>
      <div className='flex flex-col'>
        {allUserConverations && allUserConverations?.map(item=>{
          return <ContactCard email={item?.email} key={item?.id} id={item?.id || null} onClickContact={handleChangeSelectedContact}  isOnline={item?.isOnline} Name={item?.Name} unReadMessageCount={item?.unReadMessageCount} lastMessage={item?.lastMessage} lastMessageDate={item?.lastMessageDate} isSelected={selectedContact?.email==item?.email}/>
        })}
      </div>
      
    </div>
  )
}

export default ContactList