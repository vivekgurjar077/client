import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.css";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({ username: "", email: "", password: "", admin: false, phone:"", otp:"" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleSeller = (e) => {
    setUser((prev) => ({ ...prev, admin: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);
    try {
      await newRequest.post("/newuser/register", { ...user, img: url });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <div id="cre-acc-name"><h1>Create a new account</h1></div>
          <input name="username" type="text" placeholder="Enter username" required onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <div className="toggle">
            <label htmlFor="">Admin</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller}  />
              <span className="slider round"></span>
            </label>
          </div>
          <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
          <input name="phone" type="text" placeholder="Phone Number" required onChange={handleChange} />
          
          <button className="reg-btn" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
