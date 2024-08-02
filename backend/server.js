require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const userRoutes = require("./router/userRoutes");
const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB!");
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log("Error while connecting to DB!", err));
