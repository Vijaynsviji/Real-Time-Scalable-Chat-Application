import { createClient } from "redis";

const redis = createClient();
export async function sendMessage(data:string) {
  await redis.xAdd(
    "chat-stream",
    "*", // auto ID
    {
      message: data
    }
  );
}


export async function startRedisServer(){
    try{
        await redis.connect();
        console.log("Redis Connected!");

    }catch(e){
        console.error("Error in startRedisServer " + e );
    }
}
