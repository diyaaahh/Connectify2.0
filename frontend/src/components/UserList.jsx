import { useState } from "react"
import { ChatState } from "../../context/ChatProvider"
import { IoMdAdd } from "react-icons/io";
import "./Userinfo.css"
export default function UserListItem({user , handleFunction}){

  
    return(
        <div  onClick={handleFunction}  className='overall'>
            <div className="imgandname">
            <div className="divforimage">
                <img className="image" src={user.pic} />
            </div>
            <div className="divforname">
                {user.name}
               <div className="divforemail">
                {user.email}
            </div>
            <div className="divforaddicon">
             <IoMdAdd className="addicon3"/> 
            </div>
            </div>
            </div>
        </div>
    )
}