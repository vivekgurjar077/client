import React, { useReducer } from "react";
import "./Add.css";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import newRequest from "../../utils/newRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => newRequest.post("/gigs", gig),
    onSuccess: () => queryClient.invalidateQueries(["myGigs"]),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE_INPUT", payload: { name, value } });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    const feature = e.target[0].value;
    dispatch({ type: "ADD_FEATURE", payload: feature });
    e.target[0].value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/mygigs");
  };
  

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Teacher</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="title">Teacher Name</label>
            <input
              type="text"
              name="title"
              placeholder="Teacher Name"
              onChange={handleChange}
            />
            <label htmlFor="cat">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
                  <option value="select">Select</option>
                  <option value="academic">Academic</option>
                  <option value="Languages">Languages</option>
                  <option value="Competitive_Exams">Competitive Exams</option>
                  <option value="IT_Tools">IT Tools</option>
                  <option value="Professional_Trainer">Professional Trainer</option>
                  <option value="arts">Arts and Hobbies</option>
                  <option value="special_education">Special Education</option>
            </select>
            <label htmlFor="desc">Teacher Description</label>
            <textarea
              name="desc"
              placeholder="Brief description of Teacher"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Add Teacher</button>
          </div>
          <div className="details">
            <label htmlFor="shortTitle">Phone Number</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="+1 234 567 89"
              onChange={handleChange}
            />
            <label htmlFor="shortDesc">Short Description</label>
            <textarea
              name="shortDesc"
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="skills">Add Skills</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="price">Price</label>
            <input type="number" name="price" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
