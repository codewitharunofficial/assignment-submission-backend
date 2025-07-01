import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "User"],
  },
  phone: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Admin", AdminSchema);
