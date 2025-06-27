import express from "express";
import submit from "../../controllers/assignments/submit.js";
import ExpressFormidable from "express-formidable";
import fetchAssignments from "../../controllers/assignments/fetch.js";

const router = express.Router();
// router.use(ExpressFormidable());
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.post("/submit", ExpressFormidable(), submit);
router.post("/fetch", fetchAssignments);

export default router;
