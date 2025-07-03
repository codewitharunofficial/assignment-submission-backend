import UserModel from "../../models/UserModel.js";

export default async function adminLogin(req, res) {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      res.status(400).send({
        success: false,
        message: "All Fields Are Required",
      });
    } else {
      const admin = await UserModel.findOne({
        userId: userId,
        password: password,
      });
      console.log(admin);

      if (!admin) {
        res.status(403).send({
          success: false,
          message: "Invalid Credentails",
        });
      } else {
        res.status(200).send({
          success: true,
          message: "Successfully Logged In As Admin",
          admin,
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
