import moment from "moment";
import type { Message } from "./types/Types";

export function debounce(func:any, delay:number) {
  let timer:any;

  return  (...args:any)=> {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function safeJSONParse<T>(value:T, fallback: {} | [] | null) {
  try {

    if(Array.isArray(value)) return value;
    if(typeof value=="object") return value;

    return JSON.parse(value as string);
  } catch {
    return fallback;
  }
}

export function SortGivenMessageData(MessageData:Message[],isDescending=true){
  if(!MessageData || !Array.isArray(MessageData)) return MessageData ?? [];
  if(isDescending) return [...MessageData].sort((a, b) =>
            moment(a?.created_at).diff(moment(b?.created_at)),
          );
  return [...MessageData].sort((a, b) =>
            moment(b?.created_at).diff(moment(a?.created_at)),
          );
}