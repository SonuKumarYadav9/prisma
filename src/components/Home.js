import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const nav = useNavigate()

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios.delete(`http://localhost:5000/user-delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (userId) => {
    setUserId(userId);
    deleteUser(userId);
  };

  const handleUpdate = (userId) => {
    setUserId(userId);
    nav(`/user-update/${userId}`);
    // Add your update logic here
  };

  return (
    <div>
      <h1>User List</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
            <th>Image</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                <button onClick={() => handleUpdate(user.id) }>Update</button>
              </td>
              <td>  {user.profileImage}</td>
              <td>{user.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
