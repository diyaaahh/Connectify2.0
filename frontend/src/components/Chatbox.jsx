import { useState } from "react"
import {IoMdSend} from "react-icons/io"
import { ChatState } from "../../context/ChatProvider"
import Popup from 'reactjs-popup';
import getSender from "../../config/ChatLogics"
import "./Chatbox.css"
import { IoMdSettings } from "react-icons/io";
import UpdateGroupChat from "./UpdateGroupChat";

export default function ChatBox({fetchAgain , setFetchAgain}){
    const {user , selectedChat, setSelectedChat}=ChatState()
    const [newMessageText, setNewMessageText]= useState("")

    const popupContentStyle = {
        padding: '10px',
        border: ' 1.5px solid rgb(26, 40, 83)',
        borderRadius: '10px',
        width:"500px",
        
        color:"rgb(26, 40, 83)",
        maxHeight: "fit-content"
      };

    const sendMessage=() =>{

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
                                <UpdateGroupChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
                             </Popup>
                        </div> 
                    )}
                </div>
                <div className="divforchatting">
                <form className="typeandsend" onSubmit={sendMessage}>
                <div className="divfortype">
                    <input type="text"
                    value={newMessageText}
                    onChange ={ev => setNewMessageText(ev.target.value)}
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