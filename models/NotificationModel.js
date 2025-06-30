import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  targetPrograms: {
    type: [String], // e.g., ['BCA', 'BBA', 'MCA']
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  lastDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  issuedBy: {
    type: String, // e.g., 'Examination Cell', 'Registrar'
    required: true,
  },
});

export default mongoose.model("Notification", NotificationSchema);
