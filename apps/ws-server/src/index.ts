import { WebSocket, WebSocketServer } from "ws";
import {prisma} from "@repo/db/client"
import axios from "axios";

const wss = new WebSocketServer({port:8080});

wss.on("connection",async function connection(ws,request) {
    ws.on("message",async function message(data) {
        try {
            const parsedData = JSON.parse(data as unknown as string);
        if (parsedData.type == "toggle") {
           try {
            axios.put(`http://localhost:3001/${parsedData.todoId}/toggle`)
           } catch (error) {
            console.log(error);
           }
        }
        } catch (error) {
            console.log(error);
            ws.close()
        }
    })
})