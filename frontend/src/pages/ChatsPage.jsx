import axios from "axios"
import { useState } from "react";
import { useEffect } from "react"
import { ChatState } from "../../context/ChatProvider";
import "./Chatspage.css"
import SideDrawer from "../components/SideDrawer";
import Profile from "../components/Profile";
import Drawer from 'react-modern-drawer'
import MyChats from "../components/MyChats";
import ChatLoading from "../components/ChatLoading";
import UserListItem from "../components/UserList";
import ChatBox from "../components/Chatbox";
import 'react-modern-drawer/dist/index.css'



export default function ChatsPage(){

    
    const{user, setSelectedChat, chats , setChats} = ChatState();
    const [isOpen, setIsOpen] = useState(false)
    const[search , setSearch]=useState(false)
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchAgain, setFetchAgain]=useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)}

    const handleSearch = async (ev) =>{
        ev.preventDefault();
        if(!search){
            alert("No one only exists in Game of Thrones!")
            return;
        }
        try{
            setLoading(true)
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              };
        
              const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);
              setSearchResult(data);
              setLoading(false);
              
        }catch(error){
            alert('Error occured during searching')
            console.log(error)
        }
    }
    
    const accessChat = async (userId) => {
        try{
        setLoading(true)
        const config = {
            headers:{
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
            }
        }
        const{data} = await axios.post("http://localhost:5000/api/chat", {userId}, config)

        if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
        setSelectedChat(data)
        setLoading(false)
        
        }catch(error){
            alert("Error fetching chats ")
            console.log(error)
        }
        }

    return(
        <div className='Chatspage'>
        <div className="overalldiv">
            <div className="navbar">
                {user &&
                <div onClick={toggleDrawer}>
                    <SideDrawer/>
                </div>}
                <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                className='drawer'
            >
                <div className="search">
                    <input type="text" onChange={(e) => setSearch(e.target.value)} className="searchbar2"/>
                    <button onClick={handleSearch} className="searchbutton2"> Search</button>
                </div>
                <div>
                    {loading? (
                        <ChatLoading/>
                    ):(
                        searchResult?.map((user) => (
                            <UserListItem
                              key={user._id}
                              user={user}
                              handleFunction={() => accessChat(user._id)}/>))
                    )}
                </div>
            </Drawer>
                <div className="divforconnectify">
                Connectify
                </div>
                {user && 
                <div className="divforProfile">
                  <Profile/>

                </div>}

            </div>
            <div className="divafternavbar">
        <div className="leftdiv"> 
          <MyChats fetchAgain={fetchAgain}/>
        </div>
        <div className="rightdiv">
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
        </div>
            </div>
        </div>
    </div>
    )
}