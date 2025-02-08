import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TrainerSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: Number,
  emailID: String,
  password: String,
  confirmPassword: String,
  userType: String,
  name: String,
  founderName: String,
  noofemployee: Number,
  website: String,
  country: String,
  state: String,
  district: String,
  city: String,
  pincode: String,
  aboutyouself: String,
  role: String,
  specialization: String,
  yearofexperience: String,
  languages: Array,
  address: String,
  image: String,
  auth: {
    type: String,
    enum: ["success", "denied"],
    default: "denied",
  },
});

const TrainerSignupDb = model("TrainerSignup", TrainerSchema);

export default TrainerSignupDb;
