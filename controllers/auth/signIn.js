import { dummyUsers } from "../../dummyData.js";

export default async function signIn(req, res) {
    try {
        
        // console.log(req.body);
        const { enrollment_no, dob } = req.body;


        if (!enrollment_no || !dob) {

            return res.status(400).send({ success: false, message: "All Fields Are Required" });

        } else {
            const user = dummyUsers.find((dummyUser) => dummyUser.enrollment === enrollment_no && dummyUser.dob === dob);

            if (user) {
                return res.status(200).send({
                    success: true,
                    message: "Signed In Successfully",
                    user: user
                });
            } else {
                return res.status(401).send({
                    success: false,
                    message: "Invalid Credentials",
                });
            }
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}