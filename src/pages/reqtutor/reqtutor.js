import React from "react";
import { Link } from "react-router-dom";
import "./Reqtutor.css";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function Reqtutor() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["myReqtutors"],
    queryFn: () =>
      newRequest.get(`/reqtutors`).then((res) => res.data),
  });
  const mutation = useMutation(
    (id) => newRequest.delete(`/reqtutors/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myReqtutors"]);
      },
    }
  );
  const handleDelete = async (id) => {
    if (!currentUser.admin) {
      alert("You are not authorized to delete this application.");
      return;
    }
    try {
      await mutation.mutate(id);
    } catch (error) {
      console.error("Error deleting Reqtutor:", error);
    }
  };
  
  const handleApprove = async (reqtutor) => {
    try {
      await newRequest.post("/gigs", reqtutor);
      console.log("Tutor approved and saved as a gig:", reqtutor);
      await handleDelete(reqtutor._id);
      queryClient.invalidateQueries(["myReqtutors"]);
    } catch (error) {
      console.error("Error approving tutor:", error);
    }
  };
  

  return (
    <div className="myGigs">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "An error occurred while fetching data."
      ) : (
        <div className="container">
          <div className="title">
            <h1>Applications</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((reqtutor) => (
                <tr key={reqtutor._id}>
                  <td>{reqtutor.title}</td>
                  <td>{reqtutor.shortTitle}</td>
                  <td>{reqtutor.price}</td>
                  <td>{reqtutor.desc}</td>
                  <td>
                    <div className="btn">
                      <button className="approve" onClick={() => handleApprove(reqtutor)}>approve</button>
                      <img
                        className="delete"
                        src="./img/delete.png"
                        alt="Delete"
                        onClick={() => handleDelete(reqtutor._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Reqtutor;
