import React, { useState } from "react";
import axios from "axios";

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);

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
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/register/user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );
      console.log(response.data);
      // Handle the response accordingly
      alert("User Registered");
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setImage(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>User Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select id="roleInput" value={role} onChange={handleInputChange}>
          <option value="master">Master</option>
          <option value="distributer">Distributer</option>
          <option value="retailer">Retailer</option>
        </select>

        <input type="file" onChange={handleFileInputChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterUser;
