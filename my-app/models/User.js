import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    userName: {
      type: String,
      unique: [true, "Username already exists"],
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const User = models.User || model("User", UserSchema);

export default User;
