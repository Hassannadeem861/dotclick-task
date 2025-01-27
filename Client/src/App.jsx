import React, { Profiler } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Pages/Home/Home.jsx";
import Navbar from "./Components/Header/Header.jsx";
import Register from "./Pages/Register/Register.jsx";
import Login from "./Pages/Login/Login.jsx";
import ForgetPassword from "./Pages/Forget-Password/ForgetPassword.jsx";
import AdminRoute from "./Components/Routes/AdminRoutes.jsx";
import PrivateRoute from "./Components/Routes/Private.jsx";
import UserDashboard from "./Pages/UserDashboard/UserDashboard.jsx";
import AdminDashboard from "./Pages/AdminDashbooard/AdminDashboard.jsx";
import Users from "./Pages/AdminDashbooard/Users.jsx";
import Profile from "./Pages/UserDashboard/profile.jsx";
import UpdateUser from "./Pages/AdminDashbooard/updateUser.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/users/update/:id" element={<UpdateUser />} />

          <Route path="/dashboard" element={<PrivateRoute />} >
            <Route path="user" element={<UserDashboard />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />} >
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/users" element={<Users />} />
          </Route>


          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
