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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Loader from "../../utils/loader/loading";
import Copyright from "../../utils/copyright";
import { getAuthToken, storeAuthToken } from "../../redux/authToken";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../utils/CustomTextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

export default function LogIn() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleLogIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(emailId, password);

    axios
      .post("http://localhost:5000/api/auth/login", {
        emailId,
        password,
      })
      .then((response) => {
        setLoading(false);
        toast.success("Login successful");
        dispatch(storeAuthToken(response.data.auth_token));
        navigation("/");
        console.log(response.data.auth_token);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error message = ", error);
        if (error.response) {
          const serverMessage = error.response.data.message;
          toast.error(serverMessage || "An unknown error occurred.");
          console.log("Error from server:", error.response.data);
        } else if (error.request) {
          toast.error("No response from the server. Please try again.");
          console.log("No response received:", error.request);
        } else {
          // Something else went wrong
          toast.error(`Error: ${error.message}`);
          console.log("Error:", error.message);
        }
      });
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
    console.log("check = ", passwordRegex.test(newPassword));

    setIsValidPassword(passwordRegex.test(newPassword));
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  let isSignInDisabled = !(
    emailId &&
    password &&
    isValidEmail &&
    isValidPassword
  );

  return (
    <>
      <Box sx={style}>
        <div className="flex justify-center">
          <Avatar sx={{ m: 1, bgcolor: "#000000" }}>
            <LockOpenIcon />
          </Avatar>
        </div>
        <div className="space-y-5">
          <Typography variant="h5" component="h3" className="text-center">
            Login your Account!
          </Typography>
          <CustomTextField
            label={"Email"}
            value={emailId}
            onChange={handleEmailChange}
            error={!isValidEmail && emailId !== ""}
            helperText={
              !isValidEmail && emailId !== ""
                ? "Please enter a valid email address."
                : ""
            }
            multiline={false}
            rows={1}
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
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "gray", // Change the outline color to gray when focused
                },
                "& input, & textarea": {
                  color: "gray", // Change the text color to gray
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray", // Change the label color to gray
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "gray", // Change the label color to gray when focused
              },
            }}
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
            onClick={handleLogIn}
            disabled={isSignInDisabled || loading}
          >
            Log In
            {loading && <Loader loaderColor={"white"} loaderSize={30} />}
          </Button>
          <div className="space-y-1">
            <Typography className="flex justify-end space-x-2">
              <p>Don't have an account?</p>
              <p
                className="text-primary no-underline hover:underline cursor-pointer"
                onClick={() => navigation("/signin")}
              >
                Sign up now
              </p>
            </Typography>
            <Typography className="flex justify-end">
              <p className="hover:underline cursor-pointer">
                Forgot your password?
              </p>
            </Typography>
          </div>
          <Copyright />
        </div>
      </Box>
    </>
  );
}
