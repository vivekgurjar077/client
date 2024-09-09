import React from "react";
import "./GigCard.css";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  

  return (
      <div className="gigCard">
        <div className="info">
          <p>Teacher Name: {item.title}</p>
          <p>Phone Number: {item.shortTitle}</p>
          <p>Skill: {item.features.join(", ")}</p>
          <p>Description: {item.desc}</p>
        </div>
        <div className="detail">
          <div className="price">
            <h2>Price/H: ₹ {item.price}</h2>
          </div>
        </div>
      </div>
  );
  
};

export default GigCard;
