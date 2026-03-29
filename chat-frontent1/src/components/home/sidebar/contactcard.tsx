import React from 'react'
import AvatarComp from '../../UI/Avatar/Avatar';
import moment from 'moment';
import type { Contact, ContactCardProp } from './contactlist';

interface ContactCard extends ContactCardProp{
    isSelected: Boolean,
    onClickContact: (contact:Contact)=>void
}

function ContactCard({isSelected,lastMessage,lastMessageDate,unReadMessageCount,Name,isOnline=false,id,onClickContact}:ContactCard) {
    const date = new Date();
    const formattedDate = lastMessageDate? moment(lastMessageDate).format('MM/DD/YY'): ""; 
    const numberOfUnReadMessage = typeof unReadMessageCount === "number" ? unReadMessageCount.toString() : unReadMessageCount;
    const showNumberOfUnReadMessage = typeof unReadMessageCount == 'string' ? Number(unReadMessageCount)>0: (unReadMessageCount ?? 0)>0;
    const cardClassName = 'flex justify-between rounded-[15px] items-center px-[20px] py-[15px] m-[10px]' + (isSelected? " bg-[var(--bg-page)]" : "");

    const CurrentContact:Contact = {
        id: id,
        Name: Name,
        email: id?.toLocaleString() || "",
        isOnline: isOnline
    }
    
  return (
    <div className={cardClassName} onClick={()=>onClickContact(CurrentContact)}>
        <div className='flex gap-[10px] items-center'>
            <AvatarComp size={{ width: "100%"}} isOnline={isOnline} />
            <div className='flex flex-col gap-[10px]'>
                <p className='font-bold lg:text-xl text-md'>{Name}</p>
                <p className='text-[var(--secondary-text)] lg:text-md text-sm'>{lastMessage}</p>
            </div>
        </div>
        <div className='flex flex-col items-end gap-[10px]'>
            <p className='text-[var(--secondary-text)] md:text-md text-sm'>{formattedDate || ""}</p>
            {showNumberOfUnReadMessage && <p className='p-[5px] px-[15px] rounded-[10px] bg-[var(--bg-primary-button)] text-sm  text-[var(--primary-button-text)]'>{numberOfUnReadMessage || ""}</p>}
        </div>
    </div>
  )
}

export default ContactCard;