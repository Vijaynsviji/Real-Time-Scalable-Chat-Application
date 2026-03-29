import { Status } from "./types.js";





export const GetReturnMessageObject = (statusCode: number, status: Status,data?: any, StatusText?:string )=>{
    return {
        statusCode: statusCode,
        status: status,
        data: data,
        statusText: StatusText || ""
    }
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

export const setupBigIntSerialization = () => {
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
};



