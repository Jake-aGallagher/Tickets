import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttributes {
  email: String;
  password: String;
}

interface UserModel extends mongoose.Model<UserDocument> {
  build(attributes: UserAttributes): UserDocument;
}

interface UserDocument extends mongoose.Document {
  email: String;
  password: String;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };