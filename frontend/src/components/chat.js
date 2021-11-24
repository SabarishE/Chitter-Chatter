import io from "socket.io-client"
import {useEffect, useState} from  "react"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { Header } from "./header"
import {useHistory} from "react-router-dom"

import Picker from 'emoji-picker-react';


import "./chat.css"
let socket;
export const Chat=()=>{


const  history=useHistory();
    const url="https://chitter-chatter-backendkend.herokuapp.com/";

    const [userName,setuserName] =useState("");
    const [userRoom,setuserRoom] =useState("");
    const [msg,setmsg] =useState("");
    const [chatHistory,setchatHistory] =useState([]);
    const[Active,setActive]=useState([]);
   
const onEmojiClick = (event, emojiObject) => {


      if(msg===undefined){
        setmsg(emojiObject.emoji);
      }
      else{
        setmsg(msg+emojiObject.emoji);
      }

       setmsg(msg+emojiObject.emoji);
       setemojiDiv("none");
       document.getElementById("input").focus()
    
    };


useEffect(()=>{
        socket=io(url)
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const currentUser = params.get('name');
        const currentRoom=params.get("room")

        setuserName(currentUser);
        setuserRoom(currentRoom);

       socket.emit("join",{name:currentUser,room:currentRoom},(err)=>{

            if(err){

                toast("User name taken !!!",{
                    position: "bottom-right"
                })
               
             
                return  history.push("/")
                
            }
           
        })

        return ()=>{
            socket.disconnect();
            socket.off();
        }

    },[url,history])

    useEffect(()=>{

        socket.on("message",msg=>{
setchatHistory(oldchat=>[...oldchat,msg])

setTimeout(() => {
    var objDiv = document.getElementsByClassName("chat-block")[0];
    objDiv.scrollTop = objDiv.scrollHeight;
    }, 50)
        })

        socket.on("activeusers",users=>{
            setActive(users)
            })

    },[])


const sendMessage=(e)=>{
e.preventDefault();

socket.emit("sendMsg",msg,()=> setmsg(""))

setTimeout(() => {
var objDiv = document.getElementsByClassName("chat-block")[0];
objDiv.scrollTop = objDiv.scrollHeight;
}, 50)
}

const sendIcon=()=>{
    socket.emit("sendMsg",msg,()=> setmsg(""))
    setTimeout(() => {
    var objDiv = document.getElementsByClassName("chat-block")[0];
    objDiv.scrollTop = objDiv.scrollHeight;
    }, 50)
}
   
const [emojiDiv,setemojiDiv] =useState("none");



    return(
        <>
        <div className="chatpage-containter">
        <Header />
        <div className="app-container" style={{backgroundImage:`url(${require("../media/online.gif").default})`  }}>
    <div className="online-container" >
    <h2>Active</h2>
             {
                 Active.map((a,i)=>{
                     return (
                         
                        <li key={i}>{a.name} in {a.room}</li>
                         
                         
                         
                     )
                         
                     
                 })
             }
     
     </div>

            
        <div className="chat-containter"  >
            <div className="header"><img src={require("../media/chat-room.png").default} alt="room"/><span>{userRoom}</span></div>
            <div className="chat-block">
            {chatHistory.map((v,i)=>{
               
          
           return  v.user===userName?
                (<div className="from chat-line" key={i}>
      
                    <span className="avatar">{v.user.charAt(0).toUpperCase()}</span>
                    <span className="text">{v.text}</span>
                    <span className="sender">-{v.user}</span>
                    </div>):
                (<div className="to chat-line" key={i}>
                    <span className="avatar">{v.user.charAt(0).toUpperCase()}</span>
                    <span className="text">{v.text}</span>
                    <span className="sender">-{v.user}</span>
                </div>)
            
            })}
            </div>

           <div className="chat-input">

            <img src={require("../media/emoji.png").default} alt="send" onClick={()=>setemojiDiv("inline-block")}/>
            <input type="text"
            id="input" 
             value={msg}
             onKeyPress={(e)=>e.key==="Enter" ? sendMessage(e):null}
             onChange={(e)=>setmsg(e.target.value)} 
             placeholder="Your message here..."
             ></input>
            <img src={require("../media/send.png").default} alt="send" onClick={sendIcon}/>
            </div>

            <div className="emoji-picker" style={{display:emojiDiv}}>
      <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '225px',height:"225px",margin:"auto"}}  />
      </div>
        
        </div>
             
        
        
        </div>
        
        

        </div>
        </>

        
    )
}