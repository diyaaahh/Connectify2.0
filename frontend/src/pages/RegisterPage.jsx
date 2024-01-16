import { IoMdEyeOff,IoMdEye } from "react-icons/io";
import { useState } from "react";
import "./registerpage.css"
import axios from 'axios'
import{useNavigate} from "react-router-dom"

export default function RegisterPage() {

    const[showPassword1 , setShowPassword1]=useState(false)
    const[showPassword2 , setShowPassword2]=useState(false) 

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);
    const navigateTo = useNavigate()

    const postDetails = (pics) =>{
      setPicLoading(true);
    if (pics === undefined) {
      alert('Please select an image')
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Connectify2.0");
      data.append("cloud_name", "dzg9ysbmz");
      axios.post("https://api.cloudinary.com/v1_1/dzg9ysbmz/image/upload", data)
      .then((response) => {
        console.log("Cloudinary response:", response);
        setPic(response.data.url.toString());
        setPicLoading(false);
        alert('Image uploae sucessfully')
      })
      .catch((error) => {
        console.log("Cloudinary error:", error);
        setPicLoading(false);
      });
  }


    };

   async function handleRegisterSubmit(ev){
    ev.preventDefault()
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      alert('Please fill out all the fields')
      setPicLoading(false)
      return;
    }
    if(password !== confirmpassword){
      alert("Passwords do not match")
      return
    }
    console.log(name, email, password , pic )
    try{
      const config ={
        headers: {
          "Content-type": "application/json",
        }
      }
    
    const { data } = await axios.post(
      "http://localhost:5000/api/user",
      {
        name,
        email,
        password,
        pic,
      },
      config
    );
    console.log(data);
    alert("registration succesful")
    localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      navigateTo("/chats");}
      catch(error){
        alert('Error Occured')
        setPicLoading(false)
      }

   }

  return (
    <div>
      <form className="Registerform" onSubmit={handleRegisterSubmit}>
        <div className="divforregister">
        <label className="register_here"> Register here!!</label>
        </div>
        <div className="divforname">
        <input
          className="namefield"
          type="text"
          placeholder="Your name"
          onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div className="divforusername">
        <input
          className="usernamefield"
          type="text"
          placeholder="Your username"
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="divforpassword">
        <input
          className="passwordfield"
          type={showPassword1? "text" : 'password'}
          placeholder="Your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <i className="eyeicon" onClick={() => setShowPassword1(!showPassword1)}>
        {showPassword1 ? 
        <IoMdEyeOff style={{fontSize:'1.25rem'}}/> : <IoMdEye style={{fontSize:'1.25rem'}} />}
        </i>
        </div>
        <div className="divforconfirmpassword">
        <input
          className="confirmpasswordfield"
          type={showPassword2? "text" : 'password'}
          placeholder="Confirm password"
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
                <i className="eyeicon" onClick={() => setShowPassword2(!showPassword2)}>
        {showPassword2 ? 
        <IoMdEyeOff style={{fontSize:'1.25rem'}}/> : <IoMdEye style={{fontSize:'1.25rem'}} />}
        </i>
        </div>
        <div className="divforpictureupload"> 
          <label className="selectpic"> Select a picture</label>
          <input type='file' style={{ color: 'rgba(0, 0, 0, 0)' }}
          accept='image/*'
          onChange={(e) => postDetails(e.target.files[0])} />
        </div>
        <div className="divforbutton">
        <button 
        className="registerbutton"
        type="submit">
            Register
        </button>
        </div>
      </form>
    </div>
  );
}
