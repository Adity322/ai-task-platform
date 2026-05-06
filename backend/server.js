import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./src/app.js";
import "./src/config/redisClient.js";
dotenv.config();

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });