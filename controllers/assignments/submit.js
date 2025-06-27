import cloudinary from "../../DB/cloudinary.js";
import { dummyUsers } from "../../dummyData.js";
import assignment from "../../models/AssinmentModel.js";
import StudentModel from "../../models/StudentModel.js";

export default async function submit(req, res) {
  try {
    const { enrollment_no, program, program_code, remark } = req.fields;
    const { project_file } = req.files;

    // console.log(req.files.name);

    if (!program || !enrollment_no || !project_file || !program_code) {
      res.status(400).send({
        success: false,
        message: "All Fields are required",
      });
    } else if (!project_file.name?.includes(".pdf")) {
      return res.status(400).send({
        success: false,
        message: "Only PDF File is allowed",
      });
    } else if (project_file.size > 2097152) {
      return res.status(400).send({
        success: false,
        message: "Max File Size allowed is 2MB",
      });
    } else {
      const student = await StudentModel.findOne({
        enrollment_no: enrollment_no,
        dob: dob,
      });

      if (!student) {
        return res.status(401).send({
          success: false,
          message: "No Student With The Enrollment Found",
        });
      }

      const submissioId =
        `${enrollment_no}${program}${program_code}`.replaceAll("-", "");

      const results = await cloudinary.uploader.upload(project_file.path, {
        public_id: `${enrollment_no}_${Math.floor(
          Math.random() * 9000 + 1000
        )}_file`,
        resource_type: "raw",
      });

      if (results) {
        const newAssignment = new assignment({
          program: program,
          program_code: program_code,
          enrollment_no: enrollment_no,
          project_file: results,
          remark: remark ? remark : "",
          submission_id: submissioId,
        });

        await newAssignment.save();

        res.status(200).send({
          success: true,
          message: "Project Submitted Successfully",
          data: {
            newAssignment,
          },
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
