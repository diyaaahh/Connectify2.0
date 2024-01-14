import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";

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

  return <div>my chats</div>;
}
