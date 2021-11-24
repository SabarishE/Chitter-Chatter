let users=[];
let rooms=[];
let dupes=[];

 const addUser =({id,name,room})=>{

    if(!name || !room)
    {
        return ( {error:"name and room fields are required"})  
    }
if(users.length){
    const exists=users.find((v)=>v.name===name && v.room===room)

    if(exists){
        if(!dupes.includes(name)){
            dupes.push(name)
        }
        
        return ( {error:"user already exists"})
    }
}
console.log("user is unique");
const user={id,name,room}
users.push(user);

console.log("users array",users);

return { user}

}

const removeUser =(id) =>{

    const index=users.findIndex((v)=>v.id===id)
    
if(index>=0){
        if(dupes.includes(users[index].name))
   {
    console.log(dupes,index,dupes.includes(users[index].name));
        return ;
    }
    else{
        return users.splice(index,1)[0]
    }
    }
}
 
const getUser =(id) =>{

    const RequestedUser=users.find((v)=>v.id===id);

    console.log(" user array now ",users);

    return RequestedUser
}

const getUsersInRoom =(room) =>{

    return users.filter((v)=>v.room===room)
}

const getAvailableRooms =()=>{
    return rooms;
}

module.exports={
    addUser,removeUser,getUser,getUsersInRoom,getAvailableRooms
}
