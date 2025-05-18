const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const api = require("./routes/api");
const app = express();

// app.use(
//   cors({ origin: "https://ecm-frontend.onrender.com", acredentials: true })
// );
// CORS configuration
const allowedOrigins = [
  "http://localhost:5173", // Dev frontend
  "https://ecm-frontend.onrender.com", // Production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies if you're using them
  })
);

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
