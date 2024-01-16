import { IoMdClose } from "react-icons/io";
import "./MyChats.css"
export default function UserBadgeItem({user , handleFunction}){
    return(
        <div className="divforUserBadge" onClick={handleFunction}>
            <div className="divfornameinuserbadge">
            {user.name}
            </div>
            <IoMdClose />
        </div>
    )
}