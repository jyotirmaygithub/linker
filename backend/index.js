const connectToMongo = require("./config/db");
const express = require("express");
const cors = require("cors");

// connect with database
connectToMongo();

const app = express();
// port number.
const port = 5000;

app.use(cors());
// we are using middleware to convert raw json data into js object. 
app.use(express.json());

// available routes in the project
app.use("/api/dataScrape", require("./routes/dataScrape"));
app.use("/api/linkStore", require("./routes/linkStore"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/chatBot", require("./routes/chatBot"));
app.use("/api/user", require("./routes/user"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/linkRetrive", require("./routes/linkRetrive"));

app.listen(port, () => {
  console.log(`linker is working on port number :  ${port}`);
});
