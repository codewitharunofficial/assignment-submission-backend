import express from "express";
import submit from "../../controllers/assignments/submit.js";
import ExpressFormidable from "express-formidable";
import fetchAssignments from "../../controllers/assignments/fetch.js";
import fetchAllAssignments from "../../controllers/assignments/fetchAll.js";
import AssinmentModel from "../../models/AssinmentModel.js";

const router = express.Router();
// router.use(ExpressFormidable());
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.post("/submit", ExpressFormidable(), submit);
router.post("/fetch", fetchAssignments);
router.get("/fetch-all", fetchAllAssignments);

router.post("/assign", async (req, res) => {
  const { evaluatorId } = req.query;
  const { projectId } = req.body;

  try {
    await AssinmentModel.findByIdAndUpdate(projectId, {
      $addToSet: { assignedProjects: { $each: evaluatorId } },
    });
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ error: "Assignment failed" });
  }
});

export default router;
