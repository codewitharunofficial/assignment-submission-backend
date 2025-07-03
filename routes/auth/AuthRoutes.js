import express from "express";
import register from "../../controllers/auth/register.js";
import signIn from "../../controllers/auth/signIn.js";
import adminLogin from "../../controllers/auth/admin_login.js";
import UserModel from "../../models/UserModel.js";

const router = express.Router();

router.post("/signup", register);
router.post("/signin", signIn);
router.post("/admin/login", adminLogin);

export default router;
