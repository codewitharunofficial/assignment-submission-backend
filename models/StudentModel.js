import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  enrollment_no: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  isRegistered: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("Student", StudentSchema);
