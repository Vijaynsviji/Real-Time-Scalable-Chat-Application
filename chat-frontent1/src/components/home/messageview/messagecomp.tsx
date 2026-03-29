import React from "react";
import { messageData } from "./messagedata";
import MessageTile from "./messagetile";
import type { Message, Status } from "../../../utils/types/Types";
import moment from "moment";

interface MessageComp {
  messageData: Message[];
}

type MessageMap = Record<string, Message[]>;

function MessageComp({ messageData }: MessageComp) {
  const bottomRef = React.useRef<HTMLDivElement | null>(null);
  const MessageMap: MessageMap = groupMessageByDate();

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messageData]); // runs when messages change

  function groupMessageByDate(): MessageMap {
    const dateMap: MessageMap = {};

    for (let item of messageData) {
      const key = typeof item?.date=="string" ? moment(item?.date).format("YYYY-MM-DD")  :  item?.date?.toISOString()?.split("T")?.[0] || ""; // YYYY-MM-DD

      if (!dateMap[key]) {
        dateMap[key] = [];
      }

      dateMap[key].push(item);
    }

    return dateMap;
  }

  return (
    <div className="overflow-y-scroll h-[100%]">
      <div className="flex flex-col p-[10px]">
        {Object.keys(MessageMap).map((date) => {
          return (
            <>
              <div className="flex justify-center my-[20px]" ><p className="text-[var(--secondary-text)] px-[20px] p-[5px] rounded-[20px] border border-solid border-[var(--border)]">{moment(date).format("dddd, MMMM D")}</p></div>
              {MessageMap?.[date]?.map((item) => {
                return (
                  <MessageTile
                    status={item?.status as Status}
                    name={item?.person}
                    messageText={item?.text}
                    date={item?.date}
                  />
                );
              })}
            </>
          );
        })}
      </div>
      <div ref={bottomRef} id="LastDiv" />
    </div>
  );
}

export default MessageComp;
