import axios from "axios"
import { useState } from "react";
import { useEffect } from "react"

export default function ChatsPage(){
const [chats , setChats]=useState([])

    const fetchChats= async ()=>{
        try {
            const {data} = await axios.get('http://localhost:5000/api/chat');
            setChats(data); // Log the response for debugging
          } catch (error) {
            console.error('Error fetching chats:', error);
          }
    }
    useEffect(()=>{
        fetchChats();
    }, [])
    
    return(
<div>
    {chats.map((chat)=>(        // here for each chat in chats , a new div is created that displays the chatname
        <div key={chat._id}> {chat.chatName}</div>
    
    ))}
</div>
    )
}