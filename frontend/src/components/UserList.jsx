import { useState } from "react"
import { ChatState } from "../../context/ChatProvider"
import "./Userinfo.css"
export default function UserListItem({user , handleFunction}){

  
    return(
        <div onClick={handleFunction} className='overall'>
            <div className="imgandname">
            <div className="divforimage">
                <img className="image" src={user.pic} />
            </div>
            <div className="divforname">
                {user.name}
               <div className="divforemail">
                {user.email}
            </div>
            </div>
            </div>
        </div>
    )
}