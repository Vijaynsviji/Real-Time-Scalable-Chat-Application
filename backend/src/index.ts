import express from 'express';
import { prisma } from './Utils/prisma.js';
import cors from 'cors';
import authRouter from './Auth/AuthRoute.js';
import userRouter from './User/UserRoute.js';
import messageRouter from './Message/MessageRoute.js'
import conversationRouter from './Conversation/ConversationRoute.js'
import { setupBigIntSerialization } from './Utils/helperfunctions.js';
import { startRedisServer } from './Utils/redis.js';

setupBigIntSerialization()

const app = express();
startRedisServer();
const client = prisma;

app.use(cors());
app.use(express.json())


app.use(authRouter)
app.use(userRouter);
app.use(messageRouter);
app.use(conversationRouter)


app.listen(8080,(e)=>{
    console.log("Listen on Port " + 8080);
})