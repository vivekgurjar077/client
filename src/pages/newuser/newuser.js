import React, { useState, useEffect } from 'react';
import newRequest from "../../utils/newRequest";
import "./Newuser.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Newuser = ({ currentUser }) => {
  const [newUsers, setNewUsers] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchNewUsers = async () => {
      try {
        const response = await newRequest.get('/newuser/getAllNewUsers');
        console.log(response);
        setNewUsers(response.data || []);
      } catch (error) {
        console.error('Error fetching new users:', error);
      }
    };

    fetchNewUsers();
  }, []);

  const mutation = useMutation(
    
    (id) => newRequest.delete(`/newuser/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllNewUsers");
      },
    }
  );

  const handleDelete = (id) => {
   
    mutation.mutate(id);
    window.location.reload();
  };
  const handleApprove = (user) => {
    const userData = {
      username: user.username,
      email: user.email,
      password: user.password, // You should provide the password here or generate a temporary one
      admin: user.admin, // Assuming you want to approve as admin
      phone: user.phone // Assuming you have phone information
    };

    // Send request to register the approved user
    newRequest.post("/auth/register", userData)
      .then((response) => {
        console.log("User approved and registered as admin:", response.data);
        handleDelete(user._id);
        // Optionally, you can update the state to remove the approved user from the list
      })
      .catch((error) => {
        console.error("Error approving user:", error);
      });
  };
  return (
    <div className='myGigs'>
    <div className='container'>
          <div className="title">
            <h1>New Employee</h1>
          </div>
      <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Admin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
        {newUsers.map(user => (
          <tr key={user._id}>
          <td>{user.username}</td>
                  <td>{user.phone}</td>
                  <td>{user.admin ? "Admin" : "Not Admin"}</td>
                  <td>
                  <div className="btn">
                <button className="approve" onClick={() => handleApprove(user)}>approve</button>
                <img
                        className="delete"
                        src="./img/delete.png"
                        alt="Delete"
                        onClick={() => handleDelete(user._id)}
                      />
                </div>
                  </td>
                  </tr>
        ))}
      
      </tbody>
          </table>
    </div>
    </div>
  );
};

export default Newuser;

