import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Loader from "../../utils/loader/loading";
import Copyright from "../../utils/copyright";
import { storeAuthToken } from "../../redux/authToken";
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

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(username, emailId, password);

    axios
      .post("http://localhost:5000/api/auth/newuser", {
        username,
        emailId,
        password,
      })
      .then((response) => {
        setLoading(false);
        toast.success("Sign In successful");
        dispatch(storeAuthToken(response.data.auth_token));
        navigation("/");
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const serverMessage = error.response.data.message;
          toast.error(serverMessage || "An unknown error occurred.");
          console.log("Error from server:", error.response.data);
        } else if (error.request) {
          toast.error("No response from the server. Please try again.");
          console.log("No response received:", error.request);
        } else {
          toast.error(`Error: ${error.message}`);
          console.log("Error:", error.message);
        }
      });
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUser = e.target.value;
    setUsername(newUser);
    setIsValidName(newUser.length >= 4 && newUser.length <= 20);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    console.log("new to value = ", value);
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
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    setIsValidPassword(passwordRegex.test(newPassword));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);
    setIsValidConfirmPassword(newPassword === password);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  let isSignInDisabled = !(
    username &&
    emailId &&
    password &&
    confirmPassword &&
    isValidName &&
    isValidEmail &&
    isValidPassword &&
    isValidConfirmPassword
  );

  return (
    <form onSubmit={handleSignIn}>
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
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: !isValidName && username !== "" ? "red" : "gray",
                },
                "& input, & textarea": {
                  color: "black",
                },
              },
              "& .MuiInputLabel-root": {
                color: !isValidName && username !== "" ? "red" : "gray",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: !isValidName && username !== "" ? "red" : "gray",
              },
              "& .MuiFormHelperText-root": {
                color: !isValidName && username !== "" ? "red" : "gray",
              },
            }}
            helperText={
              !isValidName && username !== ""
                ? "Name must be between 4 and 20 characters."
                : ""
            }
          />
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
                  borderColor: !isValidPassword && password !== "" ? "red" : "gray",
                },
                "& input, & textarea": {
                  color: "black",
                },
              },
              "& .MuiInputLabel-root": {
                color: !isValidPassword && password !== "" ? "red" : "gray",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: !isValidPassword && password !== "" ? "red" : "gray",
              },
              "& .MuiFormHelperText-root": {
                color: !isValidPassword && password !== "" ? "red" : "gray",
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
          <TextField
            label="Confirm Password"
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            error={!isValidConfirmPassword && confirmPassword !== ""}
            helperText={
              !isValidConfirmPassword && confirmPassword !== ""
                ? "Passwords do not match."
                : ""
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor:
                    !isValidConfirmPassword && confirmPassword !== ""
                      ? "red"
                      : "gray",
                },
                "& input, & textarea": {
                  color: "black",
                },
              },
              "& .MuiInputLabel-root": {
                color:
                  !isValidConfirmPassword && confirmPassword !== ""
                    ? "red"
                    : "gray",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color:
                  !isValidConfirmPassword && confirmPassword !== ""
                    ? "red"
                    : "gray",
              },
              "& .MuiFormHelperText-root": {
                color:
                  !isValidConfirmPassword && confirmPassword !== ""
                    ? "red"
                    : "gray",
              },
            }}
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
            disabled={isSignInDisabled || loading}
          >
            Sign In
            {loading && <Loader loaderColor={"white"} loaderSize={30} />}
          </Button>

          <Typography className="flex justify-center space-x-2">
            <p>Already have an account?</p>
            <p
              className="text-primary no-underline hover:underline cursor-pointer"
              onClick={() => navigation("/login")}
            >
              Login
            </p>
          </Typography>
          <Copyright />
        </div>
      </Box>
    </form>
  );
}
