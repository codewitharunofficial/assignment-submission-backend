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
    const updatedAssignment = await AssinmentModel.findByIdAndUpdate(
      projectId,
      {
        evaluator: evaluatorId,
      }
    );
    res.status(200).send({
      success: true,
      message: "Assgined Successfully",
      updatedAssignment,
    });
  } catch (err) {
    res.status(500).send({ error: "Assignment failed" });
  }
});

router.post("/bulk-assign", async (req, res) => {
  const { evaluatorId } = req.query;
  const { projectIds } = req.body;

  try {
    await AssinmentModel.findByIdAndUpdate(projectId, {
      $addToSet: { assignedProjects: { $each: evaluatorId } },
    });
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ error: "Assignment failed" });
  }
});

router.get("/get-assigned", async (req, res) => {
  try {
    const { evaluatorId } = req.query;

    if (!evaluatorId) {
      return res.status(400).send({
        success: false,
        message: "Evaluator Id Is Required",
      });
    } else {
      const assignments = await AssinmentModel.find({
        evaluator: evaluatorId,
      });
      console.log(assignments)
      if (assignments?.length === 0) {
        return res.status(302).send({
          success: false,
          message: "No Assigned Assignments Found",
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "Fetched Assigned Assignments",
          assignments,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something Went Wrong",
      error,
    });
  }
});

export default router;
