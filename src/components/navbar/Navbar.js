import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.css";
function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isActive = () => {
      window.scrollY > 0 ? setActive(true) : setActive(false);
    };
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    navigate(`/gigs?search=${input}`);
  };

  const renderAuthenticatedLinks = () => (
    <div className="user">
    {currentUser.admin ? (
      <Link id="newuser" className="link" to="/newuser">New Employee Requests</Link>
              ) : (
              <span></span>
              )}
    <div className="user" onClick={() => setOpen(!open)}>
      <span id="user-profile">{currentUser?.username}</span>
      {open && (
        <div className="options">
          <Link className="link" to="/myGigs">All Teachers</Link>
          <Link className="link" to="/add">Add New Teacher</Link>
          {currentUser.admin ? (
            <Link className="link" to="/reqtutor">Tutor Requests</Link>
              ) : (
              <span></span>
              )}
          <span className="link" onClick={handleLogout}>Logout</span>
        </div>
      )}
    </div>
    </div>
  );

  const renderUnauthenticatedLinks = () => (
    <>
      <Link className="Become-teacher-link" to="/becometeacher">Become Teacher</Link>
      <Link to="/login"><button className="link-signin">Login</button></Link>
      <Link to="/register"><button className="link-sign-up">Sign Up</button></Link>
    </>
  );

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text"><img id="nav-img" src=".\img\image.png" alt="" /></span>
          </Link>
          
        </div>
        
          
        <div className="links">
          {currentUser ? renderAuthenticatedLinks() : renderUnauthenticatedLinks()}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
