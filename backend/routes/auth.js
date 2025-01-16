const express = require("express");
const router = express.Router();
const validator = require('validator');
const user = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_secret = process.env.JWT_SECRET;

// function : object which carries id of the user document.
function idObject(newUser) {
  const data = {
    newUser: {
      id: newUser.id,
    },
  };
  return data;
}

//check password strength
const isStrongPassword = (password) => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};


router.post("/newuser", async (req, res) => {
  const { username, emailId, password } = req.body;
  console.log("email = ", emailId);

  // Basic validation using destructuring
  if (!username || !emailId || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, password are required" });
  }

  if (typeof username !== 'string') {
    return res.status(400).json({ message: "Name must be strings" });
  }
  if (!validator.isEmail(emailId)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
    });
  }

  try {
    let existingUser = await user.findOne({ email :emailId });
    if (existingUser) {
      console.log("username = ", username)
      console.log("existing = ",existingUser);
      console.log("email", emailId);
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hash = ", hashedPassword);

    const newUser = await user.create({
      username: username,
      email: emailId,
      password: hashedPassword,
    });
    console.log("newUser", newUser);
    console.log("jwt = ", JWT_secret);
    const data = idObject(newUser);
    const auth_token = jwt.sign(data, JWT_secret);
    res.json({ auth_token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error Occurred");
  }
});


router.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  console.log("email id= ", emailId)

  if (!emailId || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await user.findOne({ email: emailId });
    if (!existingUser) {
      return res.status(401).json({ message: "User does not exist!" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const data = idObject(existingUser);
    const auth_token = jwt.sign(data, JWT_secret);
    res.json({ auth_token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error Occurred");
  }
});


module.exports = router;
