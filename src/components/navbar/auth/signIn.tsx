import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  InputAdornment,
  Link,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import CloseIcon from '@mui/icons-material/Close';
import Loader from "./../../../utils/loader/loading";
import Copyright from "../../../utils/copyright";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function SignIn() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username, emailId, password);

    axios
      .post("http://localhost:5000/api/auth/newuser", {
        username,
        emailId,
        password,
      })
      .then((response) => {
        toast.success("Sign In successful");
        console.log(response.data);
      })
      .catch((error) => {
        toast.error("Invalid credentials");
        console.log(error);
      });
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value } = e.target;
    console.log("value to check = ", value)
    setUsername(e.target.value);
    console.log("what is username = ",username)
    setIsValidName(username.length >= 4 && username.length <= 20);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;  // Get the current input value
  
console.log("new to value = ",value)
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmailId(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Regular expression for password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;

    setIsValidPassword(passwordRegex.test(newPassword));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);

    setConfirmShowPassword(confirmPassword !== password);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  // let isSignInDisabled = !(
  //   email &&
  //   password &&
  //   isValidEmail &&
  //   confirmPassword &&
  //   name &&
  //   isValidName
  // );

  return (
    <>
      <button
        className="bg-blue-400 text-white text-lg px-3 py-2 hover:bg-blue-500"
        onClick={handleOpen}
      >
        Sign In
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="login-modal-title"
      >
        <Box sx={style}>
          <div className="flex justify-center">
            <Avatar sx={{ m: 1, bgcolor: "#000000" }}>
              <LockOpenIcon />
            </Avatar>
          </div>
          <div className="space-y-5">
            <Typography variant="h5" component="h3" className="text-center">
              Sign Up for an Account!
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={handleUsernameChange}
              onInput={handleInputChange}
              error={!isValidName && username !== ""}
              helperText={
                !isValidName && username !== ""
                  ? "Name must be between 4 and 20 characters."
                  : ""
              }
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={emailId}
              onChange={handleEmailChange}
              error={!isValidEmail && emailId !== ""}
              helperText={
                !isValidEmail && emailId !== ""
                  ? "Please enter a valid email address."
                  : ""
              }
            />
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              error={!isValidPassword && password !== ""}
              helperText={
                !isValidPassword && password !== ""
                  ? "Must include 8+ characters, a capital letter, a number, and a special character."
                  : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={handleShowPasswordClick}>
                      {showPassword ? (
                        <VisibilityOff sx={{ fontSize: 30 }} />
                      ) : (
                        <Visibility sx={{ fontSize: 30 }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={password}
              onChange={handlePasswordChange}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={handleShowConfirmPassword}>
                      {showConfirmPassword ? (
                        <VisibilityOff sx={{ fontSize: 30 }} />
                      ) : (
                        <Visibility sx={{ fontSize: 30 }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            {/* <Typography variant="body2" className="mt-2">
              I acknowledge ecommerce will use my information in accordance with
              its{" "} */}
            {/* <Link to="#" className="text-primary no-underline">
                Privacy Policy.
              </Link> */}
            {/* </Typography> */}

            <Button
              variant="contained"
              fullWidth
              sx={{
                my: 3,
                bgcolor: "#000000",
                borderRadius: "20px",
                "&:hover": {
                  bgcolor: "#454943",
                },
              }}
              type="submit"
              // disabled={isSignInDisabled || loading}
            >
              Sign In
              {/* {loading ? <Loader loaderColor={"white"}  loaderSize={30} /> : "CREATE ACCOUNT"} */}
            </Button>

            <Typography className="flex justify-center space-x-2">
              <p>Already have an account?</p>
              <p className="text-primary no-underline hover:underline cursor-pointer">
                Login
              </p>
            </Typography>
            <Copyright />
          </div>
        </Box>
      </Modal>
    </>
  );
}
