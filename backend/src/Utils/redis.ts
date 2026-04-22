import { createClient } from "redis";

const redis = createClient({
    url: 'redis://localhost:6381'
});
export async function sendMessage(data:string) {
  console.log(data);
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
