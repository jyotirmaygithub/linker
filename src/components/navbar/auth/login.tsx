import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
// import CloseIcon from '@mui/icons-material/Close';

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

export default function Login() {
  const [open, setOpen] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/login", { emailId, password })
      .then((response) => {
        toast.success("Login successful");
        console.log(response.data);
      })
      .catch((error) => {
        toast.error("Invalid credentials");
        console.log(error);
      });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <button
        className="bg-blue-400 text-white text-lg px-3 py-2 hover:bg-blue-500"
        onClick={handleOpen}
      >
        Login
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="login-modal-title"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            {/* <CloseIcon /> */}
          </IconButton>
          <Typography id="login-modal-title" variant="h5" component="h2">
            Login
          </Typography>
          <TextField
            onChange={handleEmailChange}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={handlePasswordChange}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-black text-white px-3 py-2"
            type="submit"
          >
            Login
          </button>
        </Box>
      </Modal>
    </div>
  );
}
