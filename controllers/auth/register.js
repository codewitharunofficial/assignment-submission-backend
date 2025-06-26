import { dummyUsers } from "../../dummyData.js";
import StudentModel from "../../models/StudentModel.js";

export default async function register(req, res) {
  try {
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
        case student.isRegistered === true:
          return res.status(404).send({
            success: false,
            message: "You're Already Registered on this Portal, Kindly Login",
          });
        case student.isRegistered === false:
          const newStudent = await StudentModel.findOneAndUpdate(
            {
              enrollment_no: enrollment_no,
              dob: dob,
            },
            {
              isRegistered: true,
            },
            {
              new: true,
            }
          );

          await newStudent.save();

          res.status(200).send({
            success: true,
            message: "Signed Up Successfully",
            student: newStudent,
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
