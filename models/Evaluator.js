
import mongoose from "mongoose";

const evaluatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    department: String,
    assignedProjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    }],
}, { timestamps: true });

const Evaluator = mongoose.model("Evaluator", evaluatorSchema);

export default Evaluator;
