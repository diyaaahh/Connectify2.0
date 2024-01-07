import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import { useState } from "react"
import './registerpage.css'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function LoginPage(){
    const[showPassword , setShowPassword]=useState(false)
    const [email , setEmail]= useState('')
    const[password, setPassword]=useState('')
    const [loading, setLoading] = useState(false);

    const navigateTo= useNavigate()

    async function handleLoginSubmit(ev){
        ev.preventDefault()
        setLoading(true);
    if (!email || !password) {
        alert('Please fill all the fields')
        setLoading(false)
        return
    }
    try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
  
        const { data } = await axios.post(
          "http://localhost:5000/api/user/login",
          { email, password },
          config
        );
  
        alert('login sucessful!')
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        navigateTo('/chats')
      } 
      catch (error) {
        console.error("Error occurred during login", error);
        alert("Error occured during login")
        setLoading(false);
      }
    }

    return(
        <div>
            <form className="Loginform" onSubmit={handleLoginSubmit}>
                <div className="divforlogin">
                <label className="login_here"> Login here!!</label>
                </div>
                <div className="divforusername">
                <input className="usernamefield" 
                    value={email}
                    type="text"
                     placeholder="Your username"
                     onChange={(e) => setEmail(e.target.value)}
                     />
                </div>
                <div className="divforpassword">
                <input className="passwordfield" 
                    value={password}
                    type={showPassword? "text" : "password"}
                    placeholder="Your password"
                    onChange={(e) => setPassword(e.target.value)}/>
                <i className="eyeicon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword? <IoMdEyeOff/> : <IoMdEye/>}
                </i>
                </div>
                <div className="divforbutton">
                <button className="loginbutton" type='submit'>
                    Login
                </button>
                </div>
                <div className="divforbutton">
                <button className="loginbutton" type='submit'
                onClick={() => {
                    setEmail("guest@exaple.com")
                    setPassword('12345')
                }}
                >
                    Login as a guest user
                </button>
                </div>
            </form>
        </div>
    )
}