import { dummyUsers } from "../../dummyData.js";
import StudentModel from "../../models/StudentModel.js";

export default async function signIn(req, res) {
  try {
    // console.log(req.body);
    const { enrollment_no, dob } = req.body;

    if (!enrollment_no || !dob) {
      return res
        .status(400)
        .send({ success: false, message: "All Fields Are Required" });
    } else {
      const student = await StudentModel.findOne({
        enrollment_no: enrollment_no,
        dob: dob,
      });

      switch (true) {
        case !student:
          return res.status(404).send({
            success: false,
            message: "Invalid Credentials",
          });
        case !student.isRegistered:
          return res.status(404).send({
            success: false,
            message:
              "You're Not Registered On This Portal Kindly Register using your Enrollment And DOB first",
          });
        default:
          res.status(200).send({
            success: true,
            message: "Logged In Successfully",
            student: student,
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
