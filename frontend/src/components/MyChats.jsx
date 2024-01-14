import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { IoMdAdd } from "react-icons/io";
import "./MyChats.css"

import getSender from "../../config/ChatLogics";
import ChatLoading from "./ChatLoading";

export default function MyChats() {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      if (!user || !user.token) {
        // Add null check for user and user.token
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:5000/api/chat", config);
      console.log(data)
      setChats(data);
    } catch (error) {
      alert("Failed creating a chat");
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [user]);  // Include user as a dependency

  return(
    <div>
        <div className="creategroupchat">
            <button className="addgroup">
                Create a group chat
            </button>
            <IoMdAdd className="addicon"/>
        </div>
        <div>
            {chats ? (<div className="divforallchats">
                    {chats.map((chat) =>(
                        <div onClick={() => setSelectedChat(chat)} key={chat._id}>
                        <div className={`divforchatname ${selectedChat === chat ? "selected" : ""}`}>
                            {!chat.isGroupChat ? getSender(loggedUser , chat.users):(chat.chatName)}
                        </div>
                        </div>
                    ))}
                 </div>
                ):(<ChatLoading/>)}
            <div>

            </div>
        </div>
    </div>
  )
}
