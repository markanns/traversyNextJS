import mongoose from "mongoose";

let connected = false;

const connectDb = async () => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("Using existing connection");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
  } catch (err) {
    console.log("Error connecting to database: ", err);
  }
};
export default connectDb;
