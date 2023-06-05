import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  // check if user is already logged in on mount
  useEffect(() => {
    let data = localStorage.getItem("user");
    if (data) {
      navigate("/");
    }
  }, [navigate]);

  // handle login form submission
  const logInControl = async () => {
    try {
      let result = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      result = await result.json();
      console.log(result)

      // if login is successful, store userId token and redirect to homepage
      if (result.status === true) {
        localStorage.setItem("user", JSON.stringify(result.name));
        localStorage.setItem("token", JSON.stringify(result.token));
        localStorage.setItem("userID", JSON.stringify(result.userID));
        localStorage.setItem("userType", JSON.stringify(result.userType));
        setToken(result.token)
        navigate("/");
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while logging in");
    }
  };

  return (
    <div className="login">
      <h1 className="heading-login">Login Yourself</h1>
      <div>
        <input
          className="inputBox"
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="inputBox"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />  <br/>
        <button className="btn" type="button" onClick={logInControl}>
          Login
        </button>
      </div>
      <Link  className='register' to={"/register"}>Register</Link>
      {
        token ? <h1>{token}</h1>:<h1>No token</h1>
      }
    </div>
  );
};

export default Login;