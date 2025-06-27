import AssinmentModel from "../../models/AssinmentModel.js";

export default async function fetchAssignments(req, res) {
  try {
    console.log(req.body);
    const { enrollment_no } = req.body;
    if (!enrollment_no) {
      return res.status(400).send({
        success: false,
        message: "Enrollment No Is Required",
      });
    } else {
      const assignments = await AssinmentModel.find({
        enrollment_no: enrollment_no,
      });

      if (assignments.length === 0) {
        return res.status(404).send({
          success: false,
          message: "No Assignments are found for this student",
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "Assignment Fetched Succesfully",
          assignments,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
}
