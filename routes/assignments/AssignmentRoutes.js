import express from "express";
import submit from "../../controllers/assignments/submit.js";
import ExpressFormidable from "express-formidable";
import fetchAssignments from "../../controllers/assignments/fetch.js";
import Evaluator from "../../models/Evaluator.js";

const router = express.Router();
// router.use(ExpressFormidable());
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.post("/submit", ExpressFormidable(), submit);
router.post("/fetch", fetchAssignments);

router.post("/evaluators/assign", async (req, res) => {
  const { id } = req.query;
  const { projectIds } = req.body;

  try {
    await Evaluator.findByIdAndUpdate(id, {
      $addToSet: { assignedProjects: { $each: projectIds } }
    });
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ error: "Assignment failed" });
  }
});


export default router;
