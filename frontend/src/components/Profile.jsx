import { ChatState } from "../../context/ChatProvider"
import "../pages/ChatsPage.css"
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";


export default function Profile(){
    const navigateTo = useNavigate()
    const logoutUser =(ev)=>{
        ev.preventDefault()
        localStorage.removeItem("userInfo")
        console.log("logout button clicked ")
        navigateTo('/')
    }


    const popupContentStyle = {
        padding: '10px',
        backgroundColor: 'rgb(26, 40, 83)',
        border: '1px solid white',
        borderRadius: '5px',
        width:"50px"
      };

  const buttonStyle = {
    backgroundColor: 'rgb(26, 40, 83)', 
    color: 'white',            
    padding: '3px',
    border: '1px solid white',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0 2px 3px white',
  };

const {user}= ChatState()
    return(
        <div>
            <Popup trigger={
            <div className="divforprofile">
                <div className="divforpicture">
                <img className="image"  src={user.pic} alt={`${user.name}'s profile`} />
                </div>
                {user.name}
            </div>} position="bottom center"
            contentStyle={popupContentStyle}>
            <button style={buttonStyle} onClick={(e) => logoutUser(e)}>LogOut</button>
            </Popup>
        </div>
    )  
}