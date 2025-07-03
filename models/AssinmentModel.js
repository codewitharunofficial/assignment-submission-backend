import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
  {
    program: {
      type: String,
      required: true,
    },
    program_code: {
      type: String,
      required: true,
    },
    enrollment_no: {
      type: String,
      required: true,
    },
    remark: {
      type: String,
      required: false,
    },
    project_file: {
      type: {},
      required: true,
    },
    submission_id: {
      type: String,
      required: true,
    },
    evaluator: {
      type: mongoose.Schema.ObjectId,
      required: false,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Assignment", AssignmentSchema);
