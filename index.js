const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contactRoute = require("./routes/contact.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("SkyUp Contact Backend is running");
});

app.use("/api/contacts", contactRoute);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port number ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });