import "./login.css"
import { useState } from "react"
import {useHistory} from "react-router-dom"
import {useForm} from "react-hook-form"
import { Header } from "./header"



// let socket;

export const Login=()=>{

    
    const[Username,setUsername]=useState();
    const [Room,setRoom] =useState();
    const history=useHistory();

    const {register,handleSubmit}=useForm();

    const loginhandler=(data)=>{

      console.log("form data",data)
history.push(`/chat?name=${Username}&room=${Room}`)
    }
    return(
        <>
        
        <div className="loginpage-containter">
        <Header/>
        <div className="login-div">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(loginhandler)} >
            <label>username</label>
            <input type="text" {...register("username")} onChange={(e)=>setUsername(e.target.value)} required></input>
            <label>room</label>
            <input type="text" {...register("roomname")} onChange={(e)=> setRoom(e.target.value)} required></input>
         
            <input type="submit" value="GET in"></input>

        </form>
        </div>
        </div>
        </>
    )
}