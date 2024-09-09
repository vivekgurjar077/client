import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.css";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs`).then((res) => res.data),
  });
  const mutation = useMutation(
    (id) => newRequest.delete(`/gigs/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myGigs"]);
      },
    }
  );
  
  const handleDelete = (id) => {
    if (!currentUser.admin) {
      alert("You are not authorized to delete this gig.");
      return;
    }
    mutation.mutate(id);
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
            <h1>Teachers</h1>
            <Link to="/add">
              <button>Add New Teacher</button>
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>phone</th>
                <th>Price</th>
                <th>Description</th>
                
              <th>{currentUser.admin ? (
              <span>Action</span>
              ) : (
              <span></span>
              )}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((gig) => (
                <tr key={gig._id}>
                  <td>{gig.title}</td>
                  <td>{gig.shortTitle}</td>
                  <td>{gig.price}</td>
                  <td>{gig.desc}</td>
                  <td>
                    {currentUser.admin ? (
                      <img
                        className="delete"
                        src="./img/delete.png"
                        alt="Delete"
                        onClick={() => handleDelete(gig._id)}
                      />
                    ) : (
                      <span></span>
                    )}
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

export default MyGigs;
