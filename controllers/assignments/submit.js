import { dummyUsers } from "../../dummyData.js";

export default async function submit(req, res) {
    try {
        const { enrollment_no, program, program_code } = req.fields;
        const { project_file } = req.files;

        console.log(req.files);


        if (!program || !enrollment_no || !project_file || !program_code) {
            res.status(400).send({
                success: false,
                message: "All Fields are required"
            })
        } else if (!project_file.name?.includes('.pdf')) {
            return res.status(400).send({
                success: false,
                message: "Only PDF File is allowed"
            })
        } else if (project_file.size > 2097152) {
            return res.status(400).send({
                success: false,
                message: "Max File Size allowed is 2MB"
            })
        } else {

            const user = dummyUsers.find((item) => item.enrollment === enrollment_no);

            if (!user) {
                return res.status(401).send({
                    success: false,
                    message: "No Student With The Enrollment Found"
                })
            }

            const dateNow = Date.now();

            const submissioId = `${enrollment_no}${program}${program_code}`.replaceAll('-', "");

            res.status(200).send({
                success: true,
                message: "Project Submitted Successfully",
                data: {
                    program,
                    program_code,
                    submissioId,
                    project_file,
                    dateNow
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}