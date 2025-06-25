import express from "express";
import submit from "../../controllers/assignments/submit.js";
import ExpressFormidable from "express-formidable";

const router = express.Router();
router.use(ExpressFormidable());
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.post("/submit", ExpressFormidable(), submit);

export default router;
