import { IoMdClose } from "react-icons/io";
import "./MyChats.css"
export default function UserBadgeItem({user , handleFunction}){
    console.log(user)
    return(
        <div className="divforUserBadge" onClick={handleFunction}>
            <div className="divfornameinuserbadge" >
            <div className="divforeachnameinuserbadge">
            {user && user.name}

            </div>
            <IoMdClose />
            </div>
        </div>
    )
}