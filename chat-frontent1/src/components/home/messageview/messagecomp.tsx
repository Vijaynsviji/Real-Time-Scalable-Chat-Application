import React from "react";
import { messageData } from "./messagedata";
import MessageTile from "./messagetile";
import type { Message, Status } from "../../../utils/types/Types";
import moment from "moment";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { apiBaseUrl } from "../../../config/api";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { SortGivenMessageData } from "../../../utils/HelperFunctions";
import { useIsMobile } from "../../hooks/useMobileView";

interface MessageComp {
  messageData: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

type MessageMap = Record<string, Message[]>;

function MessageComp({ messageData,setMessages }: MessageComp) {
  const bottomRef = React.useRef<HTMLDivElement | null>(null);
  const conversations = useSelector(
    (state: any) => state?.conversations?.conversations,
  );
  const currentUserDetails = useSelector(
    (state: any) => state?.user?.currentUser,
  );
  const selectedUserContact = useSelector(
    (state: any) => state?.conversations?.selectedContact,
  );
  const MessageMap: MessageMap = groupMessageByDate();
  const [isFetchingMessages, setIsFetchingMessages] = React.useState(false);
  const [paginationValue, setPaginationValue] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [stopScrollingDown, setStopSCrollingDown] = React.useState(true);
  
  const {isMobile} = useIsMobile();

  React.useEffect(() => {
    setStopSCrollingDown(false);
  }, [messageData]); // runs when messages change

  React.useEffect(() => {
    if (!stopScrollingDown) {
      bottomRef.current?.scrollIntoView();
    }
  }, [messageData]);

  function groupMessageByDate(): MessageMap {
    const dateMap: MessageMap = {};

    for (let item of messageData) {
      const key =
        typeof item?.created_at == "string"
          ? moment(item?.created_at).format("YYYY-MM-DD")
          : item?.created_at?.toISOString()?.split("T")?.[0] || ""; // YYYY-MM-DD

      if (!dateMap[key]) {
        dateMap[key] = [];
      }

      dateMap[key].push(item);
    }

    return dateMap;
  }

  function getMessagePersonName(id: string) {
    if (!id) return "Unknown";

    if (id == currentUserDetails?.user_id) {
      return "You";
    }

    return conversations?.[id]?.Name || "";
  }

  async function loadMoreMessages() {
    try {
      if (
        !messageData ||
        !Array.isArray(messageData) ||
        messageData?.length == 0
      )
        return;
        setIsFetchingMessages(true);
      const sizeOfMessageArray = messageData?.length;

      const lastMessageId = SortGivenMessageData(messageData)?.[0]?.message_id;
      const conversation_id = selectedUserContact?.conversation_id;

      const response = await axios.get(
        `${apiBaseUrl}/conversation/${conversation_id}/messages/pagination`,
        {
          params: {
            last_message_id: lastMessageId,
            paginationValue: paginationValue,
          },
        },
      );
      const MessagesData = response?.data;
      if (
        MessagesData &&
        Array.isArray(MessagesData?.data) &&
        MessagesData?.data?.length < 20
      ) {
        setHasMore(false);
        setMessages((prev) => [...prev, ...MessagesData?.data]);
        setStopSCrollingDown(true);
      }else{
        setMessages((prev) => [...prev, ...MessagesData?.data]);
        setStopSCrollingDown(true);
        setPaginationValue(prev=>prev++);
      }
      setIsFetchingMessages(false);
    } catch (e) {
      console.error("Error in loadMoreMessages " + e);
      return;
    }
  }

  const handleScroll = async (
  e: React.UIEvent<HTMLDivElement>
) => {
   const element = e.currentTarget;

   if (
      element.scrollTop < 200 && !isFetchingMessages && 
      hasMore
   ) {
      await loadMoreMessages();
   }
};

  return (
    <div id="scrollableChat" className="overflow-y-scroll h-[100%] [overflow-anchor:auto]" onScroll={handleScroll}>
        <div className="flex flex-col p-[10px]">
          {Object.keys(MessageMap)
            .sort((a, b) => a.localeCompare(b))
            .map((date,index) => {
              const sortedMessagesBasedOnTime = SortGivenMessageData(MessageMap?.[date]);
              return (
                <React.Fragment key={date}>
                  <div className="flex justify-center my-[20px]">
                    <p className="text-[var(--secondary-text)] px-[20px] p-[5px] rounded-[20px] border border-solid border-[var(--border)]">
                      {moment(date).format("dddd, MMMM D")}
                    </p>
                  </div>
                  {sortedMessagesBasedOnTime?.map((item) => {
                    const personValue = getMessagePersonName(
                      item?.sender_id || "",
                    );
                    const key = item?.message_id || item?.message_encrypt;
                    return (
                      <MessageTile
                        key={key}
                        status={item?.status as Status}
                        name={personValue}
                        messageText={item?.message_encrypt}
                        date={item?.created_at}
                      />
                    );
                  })}
                </React.Fragment>
              );
            })}
        </div>
      <div ref={bottomRef} id="LastDiv" />
    </div>
  );
}

export default MessageComp;
