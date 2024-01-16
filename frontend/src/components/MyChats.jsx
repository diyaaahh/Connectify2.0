
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { IoMdAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import "./MyChats.css"
import UserListItem from "./UserList.jsx"
import UserBadgeItem from "./Userbadge";
import getSender from "../../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import e from "cors";

export default function MyChats() {
  const [loggedUser, setLoggedUser] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false); // State to manage popup visibility
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const[groupChatName , setGroupChatName]= useState()
  const[selectedUsers , setSelectedUsers] = useState([])
  const[search, setSearch]= useState('')
  const[searchResults , setSearchResults]=useState([])

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
      console.log(data);
      setChats(data);
    } catch (error) {
      alert("Failed creating a chat");
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [user]); // Include user as a dependency

  const handleSearch= async (query) =>{
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);
      console.log(data);

      setSearchResults(data);
    } catch (error) {
     alert("Error while searching for users")
    }

  }
  const handleDelete=(delUser)=>{
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  }


const handleGroup =(userToAdd) =>{
  if (selectedUsers.includes(userToAdd)) {
    alert("User already added")
    return;
  }

  setSelectedUsers([...selectedUsers, userToAdd]);
}

const handleGroupCreation = async () => {
  if (!groupChatName || !selectedUsers) {
    alert("Please fill all the fields ")
    return;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/chat/group`,
      {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      },
      config
    );
    setChats([data, ...chats]);
    setPopupOpen(false)
  } catch (error) {
    alert("Failed to create chat")
    console.log(error)
  }
};
  return (
    <div>
      <div className="creategroupchat">
        <button
          className="addgroup"
          onClick={() => setPopupOpen(true)} // Open the popup on button click
        >
          Create a group chat
        </button>
        <IoMdAdd className="addicon" />
      </div>
      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup-content">
            <button className="closepopup" onClick={() => setPopupOpen(false)}>
            <IoMdClose />
            </button>
              <div className="divforinputs">
                  <input type='text' placeholder="The name of the group chat" className="inputforchatname" onChange={(e) => setGroupChatName(e.target.value)}/>
                  <input type='text' placeholder="Users you want to add " className="inputformembers" onChange={(e) => handleSearch(e.target.value)}/>

                  {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}

               <div className="searchedusers">
               {searchResults
                ?.slice(0, 4)
                .map((user)=> (
                  <div  onClick={()=>handleGroup(user)}  className='overall2' key={user._id}>
                  <div className="imgandname2">
                  <div className="divforimage2">
                      <img className="image2" src={user.pic} />
                  </div>

                     <div className="divforemail2">
                      {user.email}
                  </div>
                  </div>
              </div>
                ))}
              </div>
                  <button className="creategroup" onClick={handleGroupCreation}> Create Group Chat</button>
              </div>
          </div>
        </div>
      )}
      <div>
        {chats ? (
          <div className="divforallchats">
            {chats.map((chat) => (
              <div
                onClick={() => setSelectedChat(chat)}
                key={chat._id}
              >
                <div
                  className={`divforchatname ${
                    selectedChat === chat ? "selected" : ""
                  }`}
                >
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
        <div></div>
      </div>
    </div>
  );
}
