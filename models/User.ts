import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
    },
    username: {
      type: String,
      unique: [true, "Username already exists"],
    },
    password: String,
    avatar: String,
    bio: String,
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
