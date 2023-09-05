import { app } from "./app";
import mongoose from "mongoose";

const startup = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY not found");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to Mongo");
  } catch (err) {
    console.log(err);
  }
};

app.listen(3000, () => {
  console.log("listening on port 3000");
});

startup();
