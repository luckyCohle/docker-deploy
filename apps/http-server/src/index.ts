import express from "express";
import {prisma} from "@repo/db/client"

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.get("/",async(req,res)=>{
    try {
        let userList = await prisma.user.findMany();
        res.send({
            users:userList
        })
    } catch (error) {
        res.status(403).json({
            message:"couldn't fetch the data",
            error
        })
    }
})
app.post("/",async(req,res)=>{
    const {username,password} = req.body;
    try {
        const newUser = await prisma.user.create({
            data:{
                username,
                password
            }
        });
        res.send({
            message:"user created",
            user:newUser
        })
    } catch (error) {
        // console.log(error);
        res.status(403).send({
            message:"error while createing user",
            err:error
        })
    }
})

app.get("/:user/todo",async(req,res)=>{
    const userId = req.params.user;
    try {
        let todoList = await prisma.todo.findMany({
            where:{
                userId
            }
        });
        res.send({
            todos:todoList
        })
    } catch (error) {
        res.status(403).json({
            message:"couldn't fetch the data",
            error
        })
    }
})
app.post("/:user/todo",async(req,res)=>{
    const userId = req.params.user;
    const {title,description} = req.body;
    try {
        let newTodo = await prisma.todo.create({
            data:{
                title,
                description,
                userId
            }
        })
        res.json({
            message:"todo created",
            todo:newTodo
        })
    } catch (error) {
        res.status(403).json({
            message:"todo couldn't be created",
            error
        })
    }
})
app.put("/:todoId/toggle",async (req,res)=>{
    const todoId = parseInt(req.params.todoId);
    try {
        const existingTodo = await prisma.todo.findUnique({
            where: { id: todoId },
        });
        if(!existingTodo){
            throw console.error("no such todo found");
            
        }
        let updatedTodo = await prisma.todo.update({
            where: {
                id: todoId
            },
            data:{
                isDone:!existingTodo.isDone
            }
        })
        res.send({
            message:`todo marked as ${updatedTodo.isDone?"true":"false"}`
        })
    } catch (error) {
        res.status(403).json({
            message:"toggle operation failed",
            error
        })
    }
})

app.listen(3001,()=>console.log("http-server listning to port 3001"));