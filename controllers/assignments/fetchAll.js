import AssinmentModel from "../../models/AssinmentModel.js";

export default async function fetchAllAssignments(req, res) {
  try {
    const assignments = await AssinmentModel.find({});

    if (assignments.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No Assignments are found",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Assignment Fetched Succesfully",
        assignments,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
}
