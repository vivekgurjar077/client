import React, { useState } from "react";
import "./Featured.css";
import { useNavigate } from "react-router-dom";

export default function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!input.trim()) {
      window.alert("Please enter a search query.");
      return;
    }
    navigate(`/gigs?search=${encodeURIComponent(input)}`);
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find online Teachers <br />and Home tutor
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder="Search tutor / skill / phone number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search...</button>
          </div>
        </div>
        <div className="right">
          <img id="showcase-img" src="./img/10733824_4542742.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}
