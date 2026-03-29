import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CustomInputComp from "../../UI/InputComp/CustomInputComp";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SendIcon from "@mui/icons-material/Send";
import type { Message } from "../../../utils/types/Types";
import { IconButton } from "@mui/material";

import { v4 as uuidv4 } from "uuid";

interface MessageInput {
  sendMessage: (messsage: Message) => void;
}

function MessageInput({ sendMessage }: MessageInput) {
  const [message, setMessage] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);

  const handleChangeMessage = (newValue: string) => {
    if(!newValue && newValue.length==0) setIsTyping(false);
    else{
        if(!isTyping) setIsTyping(true);
    }
    setMessage(newValue);
  };

  const handleSendMessage = () => {
    const newMessage:Message = {
      id: uuidv4(),
      text: message,
      person: "You",
      date: new Date(),
      status: "sent",
    };
    sendMessage(newMessage);
    setMessage("");
    setIsTyping(false)
  };

  return (
    <div className="flex gap-[20px] justify-between items-center px-[30px] py-[15px]   border-t border-solid border-[var(--border)]">
      <AttachFileIcon />
      <CustomInputComp
        inputValue={message}
        handleChange={handleChangeMessage}
        inputType={"text"}
      />
      {!isTyping && <KeyboardVoiceIcon />}

      {isTyping && (
        <div className={"bg-[var(--bg-primary-button)] rounded-[10px] p-[5px]"}>
          <IconButton onClick={handleSendMessage}>
            <SendIcon
              sx={{
                color: "var(--primary-button-text)",
              }}
            />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default MessageInput;
