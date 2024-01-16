import {IoMdSend} from "react-icons/io"

export default function ChatBox(){
    return(
        <div>
            <div className="flex-grow">
                Messages with selected person 
            </div>
            <div className="typeandsend">
                <div>
                    <input type="text" placeholder="Write a message" className="typing"/>
                </div>
                <button className="divforsend">
                 <IoMdSend className="sendicon"/>
                 </button>
            </div>
        </div>
    )
}