const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const api = require("./routes/api");
const app = express();

app.use(cors());

app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.json());

//App routes
app.use("/api/v1", api);
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "public", "index.html"));
// });

app.get("/", (req, res) => {
  res.send("Welcome to E-Commerce Marketplace");
});

module.exports = app;
