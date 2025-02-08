import mongoose from "mongoose";

const { Schema } = mongoose;

const CallSchema = new Schema({
  callerId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["ongoing", "completed", "failed"],
    default: "ongoing",
  },
});

export default mongoose.model("Call", CallSchema);
