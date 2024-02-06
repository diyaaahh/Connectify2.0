import { useState } from "react"
import {IoMdSend} from "react-icons/io"
import { ChatState } from "../../context/ChatProvider"
import Popup from 'reactjs-popup';
import getSender from "../../config/ChatLogics"
import "./Chatbox.css"
import { IoMdSettings } from "react-icons/io";
import UpdateGroupChat from "./UpdateGroupChat";
import axios from "axios";
import { useEffect } from "react";
import ScrollableChat from "./scrollablechat";


export default function ChatBox({fetchAgain , setFetchAgain}){
    const {user , selectedChat, setSelectedChat}=ChatState()
    const [newMessage, setNewMessage]= useState("")
    const [messages, setMessages] = useState([])

    const popupContentStyle = {
        padding: '10px',
        border: ' 1.5px solid rgb(26, 40, 83)',
        borderRadius: '10px',
        width:"500px",
        
        color:"rgb(26, 40, 83)",
        maxHeight: "fit-content"
      };

      const fetchMessages= async () =>{
        if(!selectedChat) return 
        try{
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              };
            const {data} = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`,config)
 
            setMessages(data);

        }catch(error){
            alert("error fetching messages")
            console.log(error)
        }
      }

      useEffect(()=>{
        fetchMessages()
      },[selectedChat])

      const typingHandler = (ev) =>{
        setNewMessage(ev.target.value)
    }
    const sendMessage=async (event) =>{
        event.preventDefault()
        if(newMessage){
            try {
                const config = {
                  headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                  },
                };
                setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:5000/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        setMessages([...messages, data]);

            }catch (error) {
                console.error("Error sending message:", error);
                alert("Failed to send the message");
              }
        }

    }
    return(
        <div className="chatboxoverall">
             {!selectedChat && (
                    <div className="noselectedperson"> No selected chat</div>
                   )}    
           
            {!!selectedChat && (
                <div className="whenchatselected">
                <div>
                    {!selectedChat.isGroupChat ? (
                        <div className="selectedchatname">
                            {getSender(user,selectedChat.users )}
                            
                        </div>
                    ):(
                        <div className="groupchatname">
                             {selectedChat.chatName.toUpperCase()}
                            <Popup trigger={
                                <div>
                                    <IoMdSettings className="settingsicon"/>
                                </div>
                             }
                             position="bottom center"
                            contentStyle={popupContentStyle}
                             >
                                <UpdateGroupChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}
                                fetchMessages={fetchMessages}
                                />
                             </Popup>
                        </div> 

                    )}
                     
                </div>
                <div className="divforchatting">
                <ScrollableChat messages={messages}/>
                <form className="typeandsend" onSubmit={sendMessage}>
                <div className="divfortype">
                    <input type="text"
                    value={newMessage}
                    onChange ={typingHandler}
                    placeholder="Write a message" className="typing"/>
                </div>
                <button className="divforsend"
                type="submit">
                 <IoMdSend className="sendicon"/>
                 </button>
            </form>
            </div>
                </div>
            )}
        </div>
    )
}