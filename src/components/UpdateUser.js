import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
  const params = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);


console.log(params.id)


const fetchUser = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(`http://localhost:5000/user/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const user = await response.json();
      console.log(user.data);
      setName(user.data.name);
      setEmail(user.data.email);
      // Set other fields as needed
    } else {
      console.log('Error:', response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
};


  const handleInputChange = (e) => {
    setRole(e.target.value);
  };

  const handleFileInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('image', image);

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.put(`http://localhost:5000/user-update/${params.id}`, formData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      // Handle the response accordingly
      alert('User updated');
      // Reset the form or navigate to another page
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="file" onChange={handleFileInputChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
