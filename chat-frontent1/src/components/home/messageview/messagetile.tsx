


import React from 'react'
import AvatarComp from '../../UI/Avatar/Avatar';
import type { Status } from '../../../utils/types/Types';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import moment from 'moment';

interface MessageTile{
  name: string,
  messageText: string,
  date: Date,
  status: Status
}

function MessageTile({name,messageText,date,status}:MessageTile) {
  const formatedDate = moment(date || new Date()).format("MMM D, HH:mm");
  const isYourMessage = name == "You";

  const outerDivClassName = name=="You" ? "flex justify-end" : "flex justify-start";

  const messageDiv = isYourMessage  ? "bg-[var(--bg-primary-button)] " : "bg-[var(--bg-card)]"

  const textColorClassName = isYourMessage ? "text-[var(--light-text)]" : "";
  const innerMessageDivClassName = isYourMessage ? "" : "w-[100%]";
  const messageContainerClassName = isYourMessage ? "justify-end" : "justify-start";



  const showDoneMarkBasedOnStatus = (status:Status)=>{
    switch(status){
      case 'sent': return <DoneIcon sx={{color:"var(--neutral-text)"}} />
      case "delivered": return <DoneAllIcon sx={{color:"var(--neutral-text)"}}/>
      case "read": return <DoneAllIcon sx={{color:"#53bdeb"}}/>
      default: return <DoneIcon sx={{color:"var(--neutral-text)"}} />
    }
  }



  return (
    <div id="outerDiv" className={outerDivClassName + ' p-[10px]'}>
      <div id="messageContainer" className={'max-w-[75%] w-[100%] flex gap-[10px] ' + messageContainerClassName}>
         { !isYourMessage &&  <AvatarComp size={{ width: 40, height: 40 }} isOnline={false} />}
          <div className={innerMessageDivClassName + ' flex flex-col gap-[5px]'}>
            {!isYourMessage && <p className='font-semibold md:text-[1.150rem] text-md'>{name}</p>}
            <div className={messageDiv + " p-[10px] rounded-[10px] flex flex-col gap-[10px]"}>
              <p className={textColorClassName + ' md:text-[1.125rem] text-sm'}>{messageText}</p>
              <div className='flex justify-between'>
                <p className={"text-[var(--neutral-text)]"}>{formatedDate}</p>
                {isYourMessage && showDoneMarkBasedOnStatus(status)}
              </div>
            </div>
          </div>

      </div>

          
    </div>
  )
}

export default MessageTile;