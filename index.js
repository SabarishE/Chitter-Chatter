const express = require("express") ;
const http=require("http");
const socketio=require("socket.io");
const cors =require("cors");

const{addUser,removeUser, getUser, getUsersInRoom}=require("./db.js")


const app=express();
const server =http.createServer(app);
const io=socketio(server,{cors:{origin:"*"}});


server.listen(5000,()=>console.log("server is 🚀 on port 5000"))

app.get("/",(req,res)=>{
    res.send("test API for chat app")
})

// ---establishing socket  connection and
// --- handle events using socket object

io.on("connect",(socket)=>{


    console.log("User connection is established");

socket.on("join",({name,room},callback)=>{
console.log(`current user >>${name},current room >> ${room}`)

const {user,error} =addUser({id:socket.id,name:name,room:room});
console.log("after joinin room >>>",user)

if(error){
    console.log("error in joining room >>>",error)
    
     callback(error);
     return;
}


socket.join(user.room);

// message to current user after joining a room.
socket.emit("message",{user:"admin",text:`Welcome ${user.name}`})
// message to all users except current user.
socket.broadcast.to(user.room).emit("message",{user:"admin",text:`${user.name} has joined`})

io.to(user.room).emit("activeusers",getUsersInRoom(user.room));
// socket.emit("AvailableRooms",getAvailableRooms());
})


socket.on("sendMsg",(message,callback)=>{

    const user=getUser(socket.id)

        io.to(user.room).emit("message",{user:user.name,text:message})
    
    
        callback();
})
 
    socket.on("disconnect",()=>{
       
        const user=removeUser(socket.id);
        console.log("User connection terminated for",user);
        if(user){
            socket.broadcast.to(user.room).emit("message",{user:"admin",text:`${user.name} has left`})
        
            io.to(user.room).emit("activeusers",getUsersInRoom(user.room));
        }
    })
}) 