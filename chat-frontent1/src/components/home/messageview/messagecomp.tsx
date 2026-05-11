import React from "react";
import { messageData } from "./messagedata";
import MessageTile from "./messagetile";
import type { Message, Status } from "../../../utils/types/Types";
import moment from "moment";
import { useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { apiBaseUrl } from "../../../config/api";
import axios from "axios";
import { CircularProgress } from "@mui/material";

interface MessageComp {
  messageData: Message[];
}

type MessageMap = Record<string, Message[]>;

function MessageComp({ messageData }: MessageComp) {
  const bottomRef = React.useRef<HTMLDivElement | null>(null);
  const conversations = useSelector((state:any)=> state?.conversations?.conversations);
  const currentUserDetails = useSelector((state:any)=> state?.user?.currentUser);
  const selectedUserContact = useSelector((state:any)=>state?.conversations?.selectedContact);
  const [CurrentViewMessageData,setCurrentViewMessageData] = React.useState<Message[]>([]);
  const MessageMap: MessageMap = groupMessageByDate();
  const [isFetchingMessages,setIsFetchingMessages] = React.useState(false);
  const [paginationValue,setPaginationValue] = React.useState(1);
  const [hasMore,setHasMore] = React.useState(true);
  const [stopScrollingDown,setStopSCrollingDown] = React.useState(true);

  React.useEffect(() => {
    if(messageData && Array.isArray(messageData) && messageData?.length>0){
      setCurrentViewMessageData(
  [...messageData].sort((a, b) =>
    moment(a?.created_at).diff(moment(b?.created_at))
  )
);
    }
    setStopSCrollingDown(false);
  }, [messageData]); // runs when messages change


  React.useEffect(()=>{
    if(!stopScrollingDown){
      bottomRef.current?.scrollIntoView();
    }
  },[messageData,CurrentViewMessageData])

  function groupMessageByDate(): MessageMap {
    const dateMap: MessageMap = {};

    for (let item of CurrentViewMessageData) {
      const key = typeof item?.created_at=="string" ? moment(item?.created_at).format("YYYY-MM-DD")  :  item?.created_at?.toISOString()?.split("T")?.[0] || ""; // YYYY-MM-DD

      if (!dateMap[key]) {
        dateMap[key] = [];
      }

      dateMap[key].push(item);
    }

    return dateMap;
  }

  function getMessagePersonName(id: string){
    if(!id) return 'Unknown';

    if(id==currentUserDetails?.user_id){
      return "You";
    }

    return conversations?.[id]?.Name || "";
  }

  async function loadMoreMessages(){
    try{
      if(!CurrentViewMessageData || !Array.isArray(CurrentViewMessageData) || CurrentViewMessageData?.length==0) return;
      const sizeOfMessageArray = CurrentViewMessageData?.length;
      const lastMessageId = CurrentViewMessageData?.[0]?.message_id;
      const conversation_id = selectedUserContact?.conversation_id;
      
      const response = await axios.get(`${apiBaseUrl}/conversation/${conversation_id}/messages/pagination`,
        {params:{
          last_message_id: lastMessageId,
          paginationValue: paginationValue
        }}
      )
      const MessagesData = response?.data
      if(MessagesData && Array.isArray(MessagesData?.data) && MessagesData?.data?.length<20) {
        setHasMore(false);
        setCurrentViewMessageData(prev=>[...prev,...MessagesData?.data]);
        setStopSCrollingDown(true);
      }
    }catch(e){
      console.error("Error in loadMoreMessages " + e);
      return;
    }
  }

  return (
    <div  id="scrollableChat" className="overflow-y-scroll h-[100%]">
    <InfiniteScroll
     next={loadMoreMessages} 
     scrollableTarget="scrollableChat" 
     inverse={true}  hasMore={hasMore} 
     dataLength={messageData?.length} 
     loader={<div className="overflow-hidden flex justify-center"><CircularProgress color="inherit" aria-label="Loading…" /></div>}
     style={{
      display: "flex",
      flexDirection: "column-reverse",
    }}
     >
      <div className="flex flex-col p-[10px]">
        {Object.keys(MessageMap).sort((a, b) => a.localeCompare(b)).map((date) => {
          const sortedMessagesBasedOnTime = MessageMap?.[date]?.sort((firstItem,secondItem)=>{
            return moment(firstItem?.created_at).diff(secondItem.created_at);
          })
          return (
            <>
              <div className="flex justify-center my-[20px]" ><p className="text-[var(--secondary-text)] px-[20px] p-[5px] rounded-[20px] border border-solid border-[var(--border)]">{moment(date).format("dddd, MMMM D")}</p></div>
              {sortedMessagesBasedOnTime?.map((item) => {
                const personValue = getMessagePersonName(item?.sender_id || "");
                return (
                  <MessageTile
                    status={item?.status as Status}
                    name={personValue}
                    messageText={item?.message_encrypt}
                    date={item?.created_at}
                  />
                );
              })}
            </>
          );
        })}
      </div>
    </InfiniteScroll>
    <div ref={bottomRef} id="LastDiv" />
    </div>
  );
}

export default MessageComp;
