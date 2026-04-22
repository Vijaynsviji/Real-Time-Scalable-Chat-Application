import { createClient,type RedisClientType } from "redis";
import { safeJSONParse } from "./utils.js";
import { AssignJob } from "./jobs/assigner.js";


const redis = createClient({
    url: 'redis://localhost:6381'
});

async function startWorker() {
  const workerName = "worker-1";

  console.log("Above While Loop");

  while (true) {
    const response = await redis.xReadGroup(
      "workers",      // group
      workerName,     // consumer
      {
        key: "chat-stream",
        id: ">"
      },
      {
        BLOCK: 0 // wait forever
      }
    );

    console.log("Connected (6381) and Worker Started!");

    if (!response) continue;

    console.log(response);

    

    if(!Array.isArray(response)) continue;
    for (const stream of response) {
        if(!stream || typeof stream != 'object') continue;
        if(!("messages" in stream) || !stream?.messages ||  !Array.isArray(stream?.messages)) continue;
        console.log("Time message", stream.messages);
        for (const message of stream.messages) {

          if(!message || typeof message !="object" || !("message" in message)) continue;
          
          const data = safeJSONParse<any>(message?.message,{});

          // 👉 Save to DB here
          // await saveToDB(data);

          await AssignJob(data);


          if(!message || !("id" in message) || !message.id) continue;
          // ACK after success
          await redis.xAck("chat-stream", "workers", message.id as any);
        }
    }
  }
}


async function ConnectAndStart (){
    try {
            console.log("Before Connecting");
    await redis.connect();
    console.log("After Connecting");
    await redis.xGroupCreate(
        "chat-stream",
        "workers",
        "0", // start from new messages
        { MKSTREAM: true }
    );

    console.log("After group Creation")

    await startWorker();
    } catch (err) {
    // group already exists
    console.log(err);
    }
}


ConnectAndStart();







