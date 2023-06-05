import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import RegisterUser from "./components/RegisterUser";
import Home from "./components/Home";
import UpdateUser from "./components/UpdateUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
               
          <Route path="/register" element={<Register/>}></Route>   
          <Route path="/login" element={<Login/>}></Route>   
          <Route path="/register-user" element={<RegisterUser/>}></Route>   
          <Route path="/user-update/:id" element={<UpdateUser/>}></Route>   
          <Route path="/" element={<Home/>}></Route>   
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;