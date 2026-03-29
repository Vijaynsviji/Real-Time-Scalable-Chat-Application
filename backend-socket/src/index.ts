import { WebSocketServer } from "ws";
import { createClient, type RedisClientType } from "redis";
import jwt from 'jsonwebtoken';
import { type WebSocket } from "ws";
import 'dotenv/config'
import type { webSocketMessage } from "./types.js";




const wss = new WebSocketServer({ port: 8081 });
const channelName = "Server1";
let redisClient: ReturnType<typeof createClient>;
const UserSocketMap = new Map();


async function AuthenticateUser(token:string | undefined, ws:WebSocket){
  try{
    if (!token) {
        ws.close(1008, "Authentication token required");
        return;
      }

      let decoded = null;
      try{
        decoded = jwt.verify(token,process.env['JWT_SECRETE'] || "JWT");
      }catch(e){
         ws.close(1008, 'Invalid or expired token');
        return;
      }



      if(typeof decoded == 'string'){
       ws.close(1008, 'Lack of Data!');
       return;
      }
      const userMailId:string = decoded.email;
      console.log("email", userMailId);
      const userId = decoded.user_id;
      await redisClient.hSet(userMailId, "channel",channelName);
      UserSocketMap.set(userMailId,ws);

  }catch(e){
    console.error("Erro in AuthenticateUser " + e);
  }
}


async function onUserSendMessage(message:string,ws:WebSocket){
  try{
    if(!message){
      ws.send("Please Send Valid Message!");
      return;
    }

    const parseMessage:webSocketMessage = JSON.parse(message);
    if(!parseMessage){
      ws.send("Please Send Valid Message Formate!");
      return;
    }

    const toEmail = parseMessage.user_email;
    const Tomessage = parseMessage?.message;
    const channelName = await redisClient.hGet(toEmail,"channel") || "";

    if(!toEmail ||!message) return;
    console.log("onUserSendMessage",parseMessage);

    await redisClient.publish(channelName,message);

    console.log("onUserSendMessage: ",parseMessage);

    
  }catch(e){
    console.error("Error in onUserSendMessage " + e);
  }

}


async function onReceivedMessage(message:string){
  try{
    if(!message){
      return;
    }

    const parseMessage:webSocketMessage = JSON.parse(message);
    const userEmail = parseMessage.user_email;
    const messageValue = parseMessage?.message;
    console.log("onReceivedMessage: ",parseMessage);

    if(!userEmail) return;
    const ws = UserSocketMap.get(userEmail);

    ws.send(message);
  }catch(e){
    console.log("Error in onReceivedMessage " + e);
  }
}

async function startSockerServer() {
  try {
     redisClient = await createClient();
     redisClient.connect();
     const redisClientForSubScribe = await createClient();
     redisClientForSubScribe.connect();
    if(!redisClient) return;

    redisClientForSubScribe.subscribe(channelName,onReceivedMessage)

    wss.on("connection",async (ws, req) => {
      if(!req){
        ws.close(1008, 'Not able to connect');
        return;
      }
      const token = req.url?.split("token=")?.[1];

      await AuthenticateUser(token,ws);

      console.log("Client connected");

      ws.on("message", (message) => {
        onUserSendMessage(message.toString(),ws)

        // ws.send("Hello Client!");
      });

      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });
  } catch (e) {
    console.error("Error in startSockerServer " + e);
  }
}

startSockerServer();
