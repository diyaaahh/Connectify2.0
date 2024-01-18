import { useState } from "react";
import { ChatState } from "../../context/ChatProvider"
import UserBadgeItem from "./Userbadge"
import axios from "axios"
import "./Chatbox.css"

export default function UpdateGroupChat ({fetchAgain , setFetchAgain}){
    const{selectedChat, setSelectedChat, user}= ChatState()
    const [groupChatName, setGroupChatName]= useState()
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleDelete=async(user1)=>{
        if(selectedChat.groupAdmin._id !== user._id){
            alert("Only the admin can remove users!")
            return;
        }
        try{
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`,
                },
            }
            const {data} = await axios.put('http://localhost:5000/api/chat/groupremove',{
                chatId:selectedChat._id,
                userId:user1._id
            }, config)
            user1._id === user._id? setSelectedChat():setSelectedChat(data);
            setFetchAgain(!fetchAgain)

        }catch(error){
            alert('Error while removing member for group')
            console.log(error)
        }
    }
    const handleGroupRename=async(ev)=>{
        ev.preventDefault()
        if(!groupChatName){return}
        try{
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`,
                },
            }
            const {data} = await axios.put('http://localhost:5000/api/chat/rename',{
                chatId : selectedChat._id,
                chatName :groupChatName
            }, config )
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)

        }catch(error){
            alert("error during renaming chat")
            console.log(error)
        }
        setGroupChatName("")
    }
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
      const handleGroupAdd =async (user1) =>{
        if(selectedChat.users.find((u)=> u._id === user1._id)){
            alert("User already in group")
            return;
        }
        if(selectedChat.groupAdmin._id !== user._id){
            alert("Only the admin can add more members!")
            return;
        }
        try{
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              };
            const {data}= await axios.put('http://localhost:5000/api/chat/groupadd',{
                chatId: selectedChat._id,
                userId: user1._id
            },config)
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            
        }catch(error){
            alert("Error occured while adding more users")
            console.log(error)
        }
      }
      
    return(
        <div className="updategc_overall">
                <div className="updategc_name">
                    {selectedChat.chatName}
                </div>
                    <div className="ugc_gcusers">
                    {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
                    </div>
                    
                        <form className="formtorenamegc" onSubmit={handleGroupRename}>
                            <input className="inputtorenamegc" type="text"
                            placeholder="Want to rename the group?" onChange={(e)=>setGroupChatName(e.target.value)}/>
                            <button className="buttontorenamegc" type="submit"> Rename </button>
                        </form>
                <div className="divtoaddoreusersingc">
                    <input className="inputtoaddmoreusers" placeholder="Add more group members?" onChange={(e) => {handleSearch(e.target.value)}}/>
                </div>
                <div className="searchedusers">
               {searchResults
                ?.slice(0, 4)
                .map((user)=> (
                  <div  onClick={()=>handleGroupAdd(user)}  className='overall2' key={user._id}>
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
              <button className="buttontoaddmoreuser">
                Add User
              </button>
                <button className="buttontoleavegc" onClick={()=>{handleDelete(user)}}> Leave </button>
        </div>
    )
}