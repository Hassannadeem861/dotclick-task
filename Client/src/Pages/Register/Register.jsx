import React, { useState, useRef } from 'react'
import './Register.css'
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import Layout from "../../Components/Layout/Layout.jsx";


const baseUrl = "http://localhost:8080"

const Signup = () => {

  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)
  const roleInputRef = useRef(null)
  const answerInputRef = useRef(null)

  const navigate = useNavigate();
  const signupSubmitHandler = async (e) => {
    e.preventDefault()

    // if (passwordInputRef.current.value !== repeatPasswordInputRef.current.value) {
    //   console.log(`passwordInputRef: ${passwordInputRef.current.value} repeatPasswordInputRef: ${repeatPasswordInputRef.current.value}`);
    //   toast.error("Password do not match");
    //   return
    // }

    try {

      const response = await axios.post(`${baseUrl}/api/v1/register`, {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        role: roleInputRef.current.value,
        answer: answerInputRef.current.value,
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (response.status == 201) {
        toast.success(response?.data?.message);
        navigate("/login");
      } else {
        toast.error(response?.data?.message);
      }

    } catch (error) {
      console.log("submit error :", error);
      toast.error(error.response?.data?.message || "Something went wrong!");

    }
  }


  return (
    <div>
      <Grid container style={{ height: "100vh" }}>
        {/* Left Section */}
        <Grid
          item
          xs={12}
          md={6}
          style={{
            background: "linear-gradient(to bottom, #1a73e8, #0047ab)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h3" style={{ fontWeight: "bold", marginBottom: "20px" }}>
            GoFinance
          </Typography>
          <Typography variant="h6" style={{ marginBottom: "30px" }}>
            The most popular peer-to-peer lending at SEA
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: "white",
              color: "#1a73e8",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Read More
          </Button>
        </Grid>

        {/* Right Section */}
        <Grid
          item
          xs={12}
          md={6}
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: "20px" }}>
            Hello Again!
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "30px" }}>
            Welcome Back
          </Typography>
          {/* Form */}
          <Box
            component="form"
            onSubmit={signupSubmitHandler}
            noValidate
            autoComplete="off"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <TextField
              fullWidth
              inputRef={emailInputRef}
              label="Email Address"
              type="email"
              variant="outlined"
              autoComplete="on"
              required
              margin="normal"
            />
            <TextField
              fullWidth
              inputRef={passwordInputRef}
              label="Password"
              type="password"
              variant="outlined"
              required
              margin="normal"
            />

            <TextField
              fullWidth
              inputRef={roleInputRef}
              label="Role"
              type="text"
              variant="outlined"
              required
              margin="normal"
            />

            <TextField
              fullWidth
              inputRef={answerInputRef}
              label="Answer"
              type="text"
              variant="outlined"
              required
              margin="normal"
            />


            <Button
              fullWidth
              type='submit'
              variant="contained"
              style={{
                backgroundColor: "#1a73e8",
                color: "white",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              Register
            </Button>

          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default Signup
